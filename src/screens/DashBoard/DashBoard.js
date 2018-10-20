import React from 'react';

class DashBoard extends React.Component {
    
    redirectToRecommendedPeoples = () => {
        this.props.history.push('/recommendedPeoples');
    }

    render() {
        return(
            <div>
                <h1>No meetings yet.</h1>
                <button onClick={this.redirectToRecommendedPeoples}>See recommended peoples</button>
            </div>
        );
    };
};

export default DashBoard;