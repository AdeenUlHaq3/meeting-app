import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import NavigationIcon from '@material-ui/icons/Navigation';
import { Typography } from '@material-ui/core';

//Import Firebase
import firebase from '../../config/firebase';

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

    componentDidMount() {
        const uid = localStorage.getItem('uid');
        firebase.database().ref(`Users/${uid}`)
            .once('value', user => {
                console.log(user.val().notifications)
            });
    };

    redirectToRecommendedPeoples = () => {
        this.props.history.push('/recommendedPeoples');
    }

    render() {
        const {
            classes
        } = this.props;

        return (
            <div>
                <Typography
                    variant='display1'
                    className={`${classes.textCenter} ${classes.margin}`}
                >
                    No meetings yet.
                </Typography>
                <Button
                    variant="extendedFab"
                    aria-label="Delete"
                    className={classes.fab}
                    onClick={this.redirectToRecommendedPeoples}
                >
                    <NavigationIcon className={classes.extendedIcon} />
                    Set A Meeting
                </Button>
            </div>
        );
    };
};

export default withStyles(styles)(DashBoard);