import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import PlacesList from '../../lists/PlacesList/PlacesList';
import { Divider } from '@material-ui/core';

class ScrollDialog extends React.Component {

  state = {
    placeSearchTerm: '',
    recommendedPlace: []
  };

  handleSearch = (e) => {
    e.preventDefault();

    const {
      placeSearchTerm
    } = this.state;

    const {
      searchPlaces
    } = this.props.VenueDetailsDialog;

    searchPlaces(placeSearchTerm);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  setSelectedPlace = (selectedPlace) => {
    this.setState({
      selectedPlace
    });
  };

  goToDateAndTime = () => {
    const {
      selectedPlace
    } = this.state;

    const {
      showDateAndTimeDialog
    } = this.state;

    if (selectedPlace) 
      showDateAndTimeDialog(selectedPlace);
  }

  render() {
    const {
      placeSearchTerm
    } = this.state;

    const {
      recommendedPlaces,
      isVenueDetailsDialog,
      closeVenueDetailsDialog,
      setNearestPlaces,
      classes
    } = this.props.VenueDetailsDialog;

    return (
      <div>
        <Dialog
          open={isVenueDetailsDialog}
          onClose={closeVenueDetailsDialog}
          scroll='paper'
          aria-labelledby="scroll-dialog-title"
          fullWidth={true}
          maxWidth={'md'}
        >
          <DialogContent>
            <Grid container>
              <Grid item lg={12}>
                <form onSubmit={this.handleSearch}>
                  <Grid container>
                    <Grid item lg={10}>
                      <TextField
                        required
                        className={classes.textfield}
                        label="Enter Place Name"
                        name="placeSearchTerm"
                        onChange={this.handleChange}
                        value={placeSearchTerm}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={2}>
                      <Button
                        className={classes.button}
                        type='submit'
                        variant="contained"
                      >
                        Search
                </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
            <DialogTitle id="scroll-dialog-title">Recommended Places</DialogTitle>
            <PlacesList
              PlacesList={{
                recommendedPlaces,
                setSelectedPlace: this.setSelectedPlace
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button className={classes.button} onClick={setNearestPlaces}>
              Nearest Places
            </Button>
            <Button className={classes.button} onClick={this.goToDateAndTime}>
              Next
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ScrollDialog;