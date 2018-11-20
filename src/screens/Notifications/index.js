import React from 'react';
import NotificationsList from './components/lists/Notifications';
import RequestDialog from './components/dialogs/Request';

//Import Firebase
import firebase from '../../config/Firebase';

//Import Material UI Components
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

//Import SweetAlert
import swal from 'sweetalert';

//Import AddToCalenderButton
import AddToCalenderDialog from './components/dialogs/AddToCalender';

const styles = {
    textCenter: {
        textAlign: 'center'
    }
};

class Notifications extends React.Component {
    constructor() {
        super();
        
        this.state = {
            isEventButtonDialog: false,
        isDialog: false
        };

        this.acceptRequest = this.acceptRequest.bind(this);
    }

    showDialog = (notification, notificationIndex) => {
        if (notification.status === 'accepted')
            return swal('Accepted Request', 'This request is accepted');
        this.setState({
            isDialog: true,
            notification,
            notificationIndex
        });
    };

    closeDialog = () => {
        this.setState({
            isDialog: false
        });
    };

    async acceptRequest(requestedUId, requestedUserMeetingIndex) {
        const {
            notificationIndex
        } = this.state;

        await firebase.database().ref(`Users/${localStorage.getItem('activeUId')}/notifications/${notificationIndex}`).update({ status: 'accepted' });
        await firebase.database().ref(`Users/${requestedUId}/meetings/${requestedUserMeetingIndex}`).update({ status: 'accepted' });
        this.closeDialog();
        this.setState({ isEventButtonDialog: true });
        // firebase.database().ref(`Users/${requestedUId}/notifications`)
        //     .set({

        //     })
    };

    closeEventButtonDialog = () => {
        this.setState({ isEventButtonDialog: false });
    };

    render() {
        const {
            isDialog,
            isEventButtonDialog,
            notification,
        } = this.state;

        const {
            classes,
            notifications
        } = this.props;

        return (
            <div>
                {
                    isEventButtonDialog &&
                    <AddToCalenderDialog
                        open={isEventButtonDialog}
                        close={this.closeEventButtonDialog}
                        event={{
                            title: 'Sample Event',
                            description: 'This is the sample event provided as an example only',
                            location: 'Portland, OR',
                            startTime: '2016-09-16T20:15:00-04:00',
                            endTime: '2016-09-16T21:45:00-04:00'
                        }}
                        listItems={[
                            { outlookcom: 'Outlook' },
                            { yahoo: 'Yahoo' },
                            { google: 'Google' }
                        ]}
                    />
                }
                {
                    notifications.length === 0
                        ?
                        <Typography
                            variant='h5'
                            className={classes.textCenter}
                        >
                            No Notifications Yet
                    </Typography>
                        :
                        notifications.map((notification, index) =>
                            <NotificationsList
                                key={index}
                                notification={notification}
                                notificationIndex={index}
                                showDialog={this.showDialog}
                            />
                        )
                }
                {
                    isDialog &&
                    <RequestDialog
                        open={isDialog}
                        close={this.closeDialog}
                        confirm={this.acceptRequest}
                        request={notification}
                    />
                }
            </div>
        );
    };
};

export default withStyles(styles)(Notifications);