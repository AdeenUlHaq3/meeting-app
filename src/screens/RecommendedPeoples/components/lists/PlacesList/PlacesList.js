import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import LocationOn from '@material-ui/icons/LocationOn';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

class SelectedListItem extends React.Component {
    state = {
        selectedIndex: null,
    };

    handleListItemClick = (index, selectedPlace) => {
        const {
            setSelectedPlace
        } = this.props.PlacesList;

        const venue = selectedPlace.venue ? selectedPlace.venue.name : selectedPlace.name;
        const crossStreet = selectedPlace.venue ? selectedPlace.venue.location.crossStreet || '' : '';
        const address = selectedPlace.venue ? selectedPlace.venue.location.address : selectedPlace.location.address || '';
        const latitude = selectedPlace.venue ? selectedPlace.venue.location.lat : selectedPlace.location.lat || '';
        const longitude = selectedPlace.venue ? selectedPlace.venue.location.lng : selectedPlace.location.lng || '';

        this.setState({
            selectedIndex: index
        });

        setSelectedPlace({ venue, crossStreet, address, latitude, longitude });
    };

    render() {
        const {
            recommendedPlaces,
            showDirections
        } = this.props.PlacesList;

        return (
            <div>
                <List component="nav">
                    {
                        recommendedPlaces.map((recommendedPlace, index) => 
                            <ListItem
                                button
                                selected={this.state.selectedIndex === index}
                                onClick={() => this.handleListItemClick(index, recommendedPlace)}
                            >
                                <ListItemText
                                    primary={`${recommendedPlace.venue ? recommendedPlace.venue.name : recommendedPlace.name}
                                                - ${recommendedPlace.venue ? recommendedPlace.venue.location.crossStreet || '' : ''}
                                                ${recommendedPlace.venue ? recommendedPlace.venue.location.address : recommendedPlace.location.address || ''}`}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">
                                        <LocationOn onClick={() => showDirections(recommendedPlace)} />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    }
                    <Divider />
                </List>
            </div>
        );
    }
}

export default SelectedListItem;