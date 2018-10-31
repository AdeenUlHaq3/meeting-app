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
        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route({
            origin: new google.maps.LatLng(24.8812296, 67.0727269),
            destination: new google.maps.LatLng(24.8861479, 67.0595196),
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                    directions: result,
                });
            } else {
                alert("Sorry! Can't calculate directions!")
            }
        });
    };

    render() {
        const {
            classes
        } = this.props;

        const {
            directions
        } = this.state;

        return (
            <div>
                <Dialog
                    fullScreen
                    open={true}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
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
                        directions={directions}
                    />
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(ShowDirections);