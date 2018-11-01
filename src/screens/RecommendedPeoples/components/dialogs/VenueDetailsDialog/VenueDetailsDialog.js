import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Divider from '@material-ui/core/Divider';

import PlacesList from '../../lists/PlacesList/PlacesList';
import ShowDirections from '../ShowDirections';

class ScrollDialog extends React.Component {

  state = {
    isShowDirectionsDialog: false,
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
    } = this.props.VenueDetailsDialog;

    if (selectedPlace)
      showDateAndTimeDialog(selectedPlace);
  }

  showDirections = (recommendedPlace) => {
    const meetPlaceLat = recommendedPlace.venue ? recommendedPlace.venue.location.lat : recommendedPlace.location.lat;
    const meetPlaceLng = recommendedPlace.venue ? recommendedPlace.venue.location.lng : recommendedPlace.location.lng;
    
    this.setState({
      meetPlaceLat,
      meetPlaceLng,
      isShowDirectionsDialog: true
    });
  };

  closeDirectionsDialog = () => {
    this.setState({
      isShowDirectionsDialog: false
    });
  };

  render() {
    const {
      isShowDirectionsDialog,
      meetPlaceLat,
      meetPlaceLng,
      placeSearchTerm
    } = this.state;

    const {
      myLat,
      myLng,
      recommendedPlaces,
      isVenueDetailsDialog,
      closeVenueDetailsDialog,
      setNearestPlaces,
      classes
    } = this.props.VenueDetailsDialog;

    const {
      fullScreen
    } = this.props;

    return (
      <div>
        <ShowDirections
          myLat={myLat}
          myLng={myLng}
          meetPlaceLat={meetPlaceLat}
          meetPlaceLng={meetPlaceLng}
          isOpen={isShowDirectionsDialog}
          onClose={this.closeDirectionsDialog}
        />

        <Dialog
          fullScreen={fullScreen}
          open={isVenueDetailsDialog}
          onClose={closeVenueDetailsDialog}
          scroll='paper'
          aria-labelledby="scroll-dialog-title"
          fullWidth={true}
          maxWidth={'md'}
        >
          <DialogTitle id="scroll-dialog-title">
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
          </DialogTitle>
          <DialogContent>
            <PlacesList
              PlacesList={{
                recommendedPlaces,
                showDirections: this.showDirections,
                setSelectedPlace: this.setSelectedPlace
              }}
            />
          </DialogContent>
          <Divider />
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

export default withMobileDialog()(ScrollDialog);