import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import PersonAdd from '@material-ui/icons/PersonAdd';

//Import Firebase
import firebase from '../../config/Firebase';

//Import Components
import Meetings from './components/lists/Meetings';

const styles = theme => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
        boxShadow: 'none',
        color: '#fff'
    },
    margin: {
        marginTop: theme.spacing.unit * 2
    },
    textCenter: {
        textAlign: 'center',
    },
});

class DashBoard extends React.Component {
    state = {
        isMeetingList: false
    };

    componentDidMount() {
        firebase.database().ref(`Users/${localStorage.getItem('activeUId')}`)
            .once('value', user => {
                if (user.val().meetings)
                    this.setState({
                        isMeetingList: true
                    });
            });
    };

    redirectToRecommendedPeoples = () => {
        this.props.history.push('/recommendedPeoples');
    };

    render() {
        const {
            classes
        } = this.props;

        const {
            isMeetingList
        } = this.state;

        return (
            <div>
                {
                    isMeetingList
                    ?
                    <Meetings />
                    :
                    <Typography
                        variant='display1'
                        className={`${classes.textCenter} ${classes.margin}`}
                    >
                        No meetings yet.
                    </Typography>
                }

                <Button
                    variant="fab"
                    aria-label="Delete"
                    className={classes.fab}
                    onClick={this.redirectToRecommendedPeoples}
                >
                    <PersonAdd className={classes.extendedIcon} />

                </Button>
            </div>
        );
    };
};

export default withStyles(styles)(DashBoard);