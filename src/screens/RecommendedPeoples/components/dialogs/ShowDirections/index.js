/* eslint-disable no-undef */
/* global google */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import MapWithDirections from './components/MapWithDirections';

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class ShowDirections extends React.Component {
    state = {

    }

    getDirections = () => {
        const {
            myLat,
            myLng,
            meetPlaceLat,
            meetPlaceLng
        } = this.props;
        
        const DirectionsService = new google.maps.DirectionsService();
        
        DirectionsService.route({
            origin: new google.maps.LatLng(myLat, myLng),
            destination: new google.maps.LatLng(meetPlaceLat, meetPlaceLng),
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                    directions: result,
                });
            } 
            else
                alert("Sorry! Can't calculate directions!")
        });
    };

    render() {
        const {
            myLat,
            myLng,
            isOpen,
            onClose,
            classes,
            meetPlaceLat,
            meetPlaceLng,
        } = this.props;

        const {
            directions
        } = this.state;

        return (
            <div>
                <Dialog
                    fullScreen
                    open={isOpen}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={onClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                Direction
              </Typography>
                            <Button color="inherit" onClick={this.getDirections}>
                                Get Directions
              </Button>
                        </Toolbar>
                    </AppBar>
                    <MapWithDirections
                        myLat={myLat}
                        myLng={myLng}
                        meetPlaceLat={meetPlaceLat}
                        meetPlaceLng={meetPlaceLng}
                        directions={directions}
                    />
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(ShowDirections);