import React from 'react';
import Cards, { Card as CardForSwipe } from 'react-swipe-deck';
import firebase from '../../config/firebase';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Grid from '@material-ui/core/Grid';
import GeoFire from 'geofire';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

//constants
import { BASE_URL, CLIENT_ID, CLIENT_SECRET, VERSION } from '../../constants/fourSquare';

import ConfirmationDialog from '../../screens/RecommendedPeoples/components/dialogs/ConfirmationDialog/ConfirmationDialog';
import VenueDetailsDialog from '../../screens/RecommendedPeoples/components/dialogs/VenueDetailsDialog/VenueDetailsDialog';

const styles = {
    button: {
        width: '100%',
        float: 'left',
        background: 'transparent',
        color: '#FE6B8B',
        boxShadow: 'none',
    },
    textfield: {
        float: 'left',
        width: '100%'
    }
};

class Card extends React.Component {

    state = {
        recommendedUsers: [],
        recommendedPlaces: [],
        isConfirmDialog: false,
        isVenueDetailsDialog: false
    }

    componentDidMount() {
        // const myUId = firebase.auth().currentUser.uid;
        const myUId = 'oUHN4GrQ7sVJaXGQE2z6VuMywad2';

        firebase.database().ref(`Users/${myUId}`)
            .once('value', me => {
                const myObj = me.val();
                const myDrinks = myObj.drinks;
                const myTimes = myObj.duration;
                const myLat = myObj.latitude;
                const myLng = myObj.longitude;

                firebase.database().ref(`Users`)
                    .once('value', restUsers => {
                        restUsers.forEach(user => {
                            const userObj = user.val();
                            const userDrinks = userObj.drinks;
                            const userTimes = userObj.duration;
                            const userLat = userObj.latitude;
                            const userLng = userObj.longitude;

                            //If mine response
                            if (me.key === user.key)
                                return;

                            //Drinks Check
                            if (myDrinks.some(drink => userDrinks.includes(drink))) {
                                //Duration Check
                                if (myTimes.some(time => userTimes <= time)) {
                                    return;
                                }
                                //Distance Check <= 5KM
                                if (GeoFire.distance([myLat, myLng], [userLat, userLng]) > 5)
                                    return;

                                const {
                                    recommendedUsers
                                } = this.state;

                                recommendedUsers.push(user.val());

                                this.setState({
                                    recommendedUsers
                                })
                            }
                        });
                    })
                    .then(() => {
                        this.setState({
                            myLat,
                            myLng
                        })
                    });
            });
    }

    confirm = (index) => {
        this.setState({
            isConfirmDialog: true,
            userIndexForMeeting: index
        })
    }

    rejectUser = () => {
        
    }

    closeConfirmDialog = (bool) => {
        const {
            myLat,
            myLng
        } = this.state;

        if (bool) {
            const SEARCH_TERM = 'explore';
            const ll = `${myLat},${myLng}`;
            var instance = axios.create({
                baseURL: BASE_URL
            });
            instance.get(`${SEARCH_TERM}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}&ll=${ll}&limit=3`)
                .then(result => {
                    const recommendedPlaces = result.data.response.groups[0].items;
                    this.setState({
                        nearestPlaces: recommendedPlaces,
                        recommendedPlaces
                    });
                })
                .catch(err => console.log(err));
        }
        this.setState({
            isConfirmDialog: false,
            isVenueDetailsDialog: bool
        })
    }

    closeVenueDetailsDialog = () => {
        this.setState({
            isVenueDetailsDialog: false
        })
    }

    searchPlaces = (placeSearchTerm) => {
        const {
            myLat,
            myLng
        } = this.state;

        const SEARCH_TERM = 'search';
        const ll = `${myLat},${myLng}`;

        var instance = axios.create({
            baseURL: BASE_URL
        })
        instance.get(`${SEARCH_TERM}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}&ll=${ll}&query=${placeSearchTerm}`)
            .then(result => {
                this.setState({
                    recommendedPlaces: result.data.response.venues 
                });
            })
            .catch(err => console.log(err));
    };

    setNearestPlaces = () => {
        const {
            nearestPlaces
        } = this.state;

        this.setState({
            recommendedPlaces: nearestPlaces
        });
    };

    sendRequestForMeeting = () => {
        console.log('a');
        
    }

    render() {
        const {
            recommendedUsers,
            recommendedPlaces,
            isConfirmDialog,
            isVenueDetailsDialog,
        } = this.state;

        const {
            classes
        } = this.props;

        return (
            <div>
                <ConfirmationDialog
                    ConfirmationDialog={{
                        classes,
                        isConfirmDialog,
                        closeConfirmDialog: this.closeConfirmDialog
                    }}
                />
                <VenueDetailsDialog
                    VenueDetailsDialog={{
                        classes,
                        isVenueDetailsDialog,
                        recommendedPlaces,
                        closeVenueDetailsDialog: this.closeVenueDetailsDialog,
                        searchPlaces: this.searchPlaces,
                        setNearestPlaces: this.setNearestPlaces,
                        sendRequestForMeeting: this.sendRequestForMeeting
                    }}
                />
                {
                    recommendedUsers.length !== 0 &&
                    <Grid container>
                        <Grid item lg={12}>
                            <Cards onEnd={this.rejectUser} className='master-root'>
                                {
                                    recommendedUsers.map((recommendedUser, index) =>
                                        <CardForSwipe
                                            key={recommendedUser.nickName}
                                            onSwipeLeft={this.rejectUser}
                                            onSwipeRight={() => this.confirm(index)}>
                                            <Grid container>
                                                <Grid item lg={12}>
                                                    <Carousel
                                                        autoPlay={true}
                                                        infiniteLoop={true}
                                                        emulateTouch={true}
                                                        swipeable={true}
                                                        showArrows={false}
                                                        showThumbs={false}
                                                    >
                                                        {
                                                            recommendedUser.images.map(image => <img key={image} src={image} alt='' />)
                                                        }
                                                    </Carousel>
                                                </Grid>
                                                <Grid item lg={12}>{recommendedUser.displayName}</Grid>
                                                <Grid item lg={12}>{recommendedUser.nickName}</Grid>
                                            </Grid>
                                        </CardForSwipe>
                                    )
                                }
                            </Cards>
                        </Grid>
                    </Grid>
                }
            </div>
        );
    };
};

export default withStyles(styles)(Card);