import React from 'react';
import Button from '@material-ui/core/Button';

class DashBoard extends React.Component {
    
    redirectToRecommendedPeoples = () => {
        this.props.history.push('/recommendedPeoples');
    }

    render() {
        return(
            <div>
                <h1>No meetings yet.</h1>
                <Button 
                    onClick={this.redirectToRecommendedPeoples}
                >
                    Set Meeting
                </Button>
            </div>
        );
    };
};

export default DashBoard;