import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import PersonAdd from '@material-ui/icons/PersonAdd';

//Import Firebase
import firebase from '../../config/Firebase';

//Import Components
import MeetingsStatus from './components/tabs/MeetingsStatus';

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
        isLoading: true,
        isMeetingList: false,
        meetings: {
            accepted: [],
            cancelled: [],
            complicated: [],
            done: [],
            pending: []
        }
    };

    componentDidMount() {
        const activeUser = localStorage.getItem('activeUId');
        
        firebase.database().ref(`Users/${activeUser}`)
        .once('value', user => {
            if (user.val().meetings) {
                const meetingsList = user.val().meetings;
                const { meetings } = this.state;

                    meetingsList.forEach(meeting => {
                        switch(meeting.status) {
                            case 'accepted':
                                meetings.accepted.push(meeting);
                                break;
                            case 'cancelled':
                                meetings.cancelled.push(meeting);
                                break;
                            case 'complicated':
                                meetings.complicated.push(meeting);
                                break;
                            case 'done':
                                meetings.done.push(meeting);
                                break;
                            case 'pending':
                                meetings.pending.push(meeting);
                                break;
                            default:
                                break;
                        };
                    });

                    this.setState({
                        meetings,
                        isMeetingList: true
                    });
                };

                this.setState({
                    isLoading: false
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
            meetings,
            isLoading,
            isMeetingList,
        } = this.state;
        
        return (
            <div>
                {
                    isLoading
                    ?
                    <Typography
                        variant='display1'
                        className={`${classes.textCenter} ${classes.margin}`}
                    >
                        Loading...
                    </Typography>
                    :
                    isMeetingList
                    ?
                    <MeetingsStatus
                        lists={meetings}
                    />
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