import React from 'react';
import Cards, { Card as CardForSwipe } from 'react-swipe-deck';
import firebase from '../../config/firebase';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Grid from '@material-ui/core/Grid';
import GeoFire from 'geofire';
import { withStyles } from '@material-ui/core/styles';

import ConfirmationDialog from '../../screens/RecommendedPeoples/components/dialogs/ConfirmationDialog/ConfirmationDialog';
import VenueDetailsDialog from '../../screens/RecommendedPeoples/components/dialogs/VenueDetailsDialog/VenueDetailsDialog';

const styles = {
    button: {
        background: 'transparent',
        color: '#FE6B8B',
        boxShadow: 'none'
    },
};

class Card extends React.Component {

    state = {
        recommendedUsers: [],
        isConfirmDialog: true,
        isVenueDetailsDialog: false
    }

    componentDidMount() {
        // firebase.auth().currentUser.uid || 
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
                                if(GeoFire.distance([myLat, myLng], [userLat, userLng]) > 5)
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

                    });

            });
    }

    confirm = (index) => {
        this.setState({
            isConfirmDialog: true,
            userIndexForMeeting: index
        })
    }

    closeConfirmDialog = (bool) => {
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

    sendRequestForMeeting = () => {

    }

    render() {
        const {
            recommendedUsers,
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
                        closeVenueDetailsDialog: this.closeVenueDetailsDialog,
                        sendRequestForMeeting: this.sendRequestForMeeting
                    }}
                />
                {
                    recommendedUsers.length !== 0 &&
                    <Grid container>
                    <Grid item lg={12}>
                    <Cards onEnd={this.action} className='master-root'>
                        {
                            recommendedUsers.map((recommendedUser, index) =>
                                <CardForSwipe
                                    key={recommendedUser.nickName}
                                    onSwipeLeft={this.action}
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