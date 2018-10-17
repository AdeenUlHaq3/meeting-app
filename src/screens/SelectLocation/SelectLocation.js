import React from 'react';
import Button from '@material-ui/core/Button';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import firebase from '../../config/firebase';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={14}
        center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    >
        {
            props.isMarkerShown
            &&
            <Marker
                position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
                draggable={true}
                onDragEnd={position => {
                    props.updateCoords({ latitude: position.latLng.lat(), longitude: position.latLng.lng() })
                }}
            />
        }
    </GoogleMap>
))

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
    }

    handleSubmit = e => {
        e.preventDefault();
        const userId = firebase.auth().currentUser.uid;

        firebase.database().ref(`Users/${userId}`)
        .set(
            {...this.props.location.state, ...this.state.coords}
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
                <MyMapComponent
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