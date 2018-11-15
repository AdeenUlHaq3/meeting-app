import React from 'react';
import Button from '@material-ui/core/Button';
import firebase from '../../../config/Firebase';
import GoogleMap from '../components/maps/GoogleMap';

class SelectLocation extends React.Component {
    state = {
        coords: null
    };

    componentDidMount() {
        this.setPosition();
    }

    setPosition() {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                coords: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
            })
        });
    }

    updateCoords = ({ latitude, longitude }) => {
        this.setState({ coords: { latitude, longitude } })
    };

    handleSubmit = e => {
        e.preventDefault();
        const myUId = firebase.auth().currentUser.uid;
        
        firebase.database().ref(`Users/${myUId}`)
        .set(
            {...this.props.location.state, ...this.state.coords, notification: []}
        )
        .then(() => {
            this.props.history.push('/dashboard');
        })
        
    }

    render() {
        const {
            coords
        } = this.state;

        return (
            coords
            &&
            <form onSubmit={this.handleSubmit}>
                <GoogleMap
                    coords={coords}
                    updateCoords={this.updateCoords}
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
                <Button type='submit'>Save</Button>
            </form>
        );
    };
};

export default SelectLocation;