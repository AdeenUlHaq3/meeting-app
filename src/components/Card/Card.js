import React from 'react';
import Cards, { Card as CardForSwipe } from 'react-swipe-deck';
import firebase from '../../config/firebase';

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
            
            firebase.database().ref(`Users`)
            .once('value', restUsers => {

                restUsers.forEach(user => {
                    const userDrinks = user.val().drinks;

                    if(me.key === user.key)
                        return;
                    if(userDrinks.some(drink => myDrinks.includes(drink))) {
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
        const data = ['Alexandre', 'Thomas', 'Lucien'];
        return (
            <Cards alertRight={this.action} onEnd={this.action} className='master-root'>
                {data.map(item =>
                    <CardForSwipe
                        key={item}
                        onSwipeLeft={this.action}
                        onSwipeRight={this.action}>
                        <h2>{item}</h2>
                    </CardForSwipe>
                )}
            </Cards>
        );
    };
};

export default Card;