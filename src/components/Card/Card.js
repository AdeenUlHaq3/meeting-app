import React from 'react';
import Cards, { Card as CardForSwipe } from 'react-swipe-deck';
import firebase from '../../config/firebase';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { width } from 'window-size';

class Card extends React.Component {

    state = {
        recommendedUsers: []
    }

    componentDidMount() {
        // firebase.auth().currentUser.uid || 
        const myUId = 'oUHN4GrQ7sVJaXGQE2z6VuMywad2';

        firebase.database().ref(`Users/${myUId}`)
            .once('value', me => {
                const myDrinks = me.val().drinks;
                const myTimes = me.val().duration;

                firebase.database().ref(`Users`)
                    .once('value', restUsers => {

                        restUsers.forEach(user => {
                            const userDrinks = user.val().drinks;
                            const userTimes = user.val().duration;

                            if (me.key === user.key)
                                return;

                            if (myDrinks.some(drink => userDrinks.includes(drink))) {
                                if (!myTimes.some(time => userTimes <= time)) {
                                    return;
                                }
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

    action = () => {

    }

    render() {
        const {
            recommendedUsers
        } = this.state;
        // console.log(recommendedUsers[0].nickName);
        // const nickName = recommendedUsers[0];
        // console.log(nickName);



        const data = ['Alexandre', 'Thomas', 'Lucien'];
        return (
            <div>
                <div style={{ width: '300px', height: '100px' }}>
                    <Carousel 
                        autoPlay={true} 
                        infiniteLoop={true} 
                        emulateTouch={true} 
                        swipeable={true} 
                        showArrows={false} 
                        showThumbs={false}
                    >
                        <img src={require('../../Assets/Images/logo.png')} alt='' />
                        <img src={require('../../Assets/Images/logo.png')} alt='' />
                        <img src={require('../../Assets/Images/logo.png')} alt='' />
                    </Carousel>
                </div>
                {/* <Cards alertRight={this.action} onEnd={this.action} className='master-root'>
                    {data.map(item =>
                        <CardForSwipe
                            key={item}
                            onSwipeLeft={this.action}
                            onSwipeRight={this.action}>
                            <h2>{item}</h2>
                        </CardForSwipe>
                    )}
                </Cards> */}
            </div>
        );
    };
};

export default Card;