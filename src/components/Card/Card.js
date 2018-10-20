import React from 'react';
import Cards, { Card as CardForSwipe } from 'react-swipe-deck';


class Card extends React.Component {
    action = (p) => {
        console.log(p);
        
    }
    render() {
        const data = ['Alexandre', 'Thomas', 'Lucien'];
        return (
            <Cards alertRight={this.action('a')} onEnd={this.action('e')} className='master-root'>
                {data.map(item =>
                    <CardForSwipe
                        key={item}
                        onSwipeLeft={this.action('l')}
                        onSwipeRight={this.action('r')}>
                        <h2>{item}</h2>
                    </CardForSwipe>
                )}
            </Cards>
        );
    };
};

export default Card;