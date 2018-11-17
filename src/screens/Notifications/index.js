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
import AddToCalender from 'react-add-to-calendar';

const styles = {
    textCenter: {
        textAlign: 'center'
    }
};

class Notifications extends React.Component {
    state = {
        isEventButtonDialog: true,
        isDialog: false
    };

    showDialog = (notification, notificationIndex) => {
        if(notification.status === 'accepted')
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

    acceptRequest = (requestedUId, requestedUserMeetingIndex) => {
        const {
            notificationIndex
        } = this.state;

        firebase.database().ref(`Users/${localStorage.getItem('activeUId')}/notifications/${notificationIndex}`)
        .update({
            status: 'accepted'
        })
        .then(() => {
            firebase.database().ref(`Users/${requestedUId}/meetings/${requestedUserMeetingIndex}`)
            .update({
                status: 'accepted'
            });

            this.closeDialog();
            this.setState({
                isEventButtonDialog: true
            });
        })        
    };

    render() {
        const {
            event,
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
                    <AddToCalender 
                        event={event} 
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