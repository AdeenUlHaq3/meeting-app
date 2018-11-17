import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import DateAndTime from './components/DateAndTime';

import firebase from '../../../../../config/Firebase';

class DateAndTimeDialog extends React.Component {
    state = {
        selectedDate: new Date(),
        open: false,
    };

    handleDateChange = (date) => {
        this.setState({
            selectedDate: date
        });
    };

    sendRequestForMeeting = (selectedPlace) => {
        const {
            selectedDate
        } = this.state;

        const {
            closeDateAndTimeDialog,
            swappedUserId,
            nickName,
            displayName,
            displayPic
        } = this.props;

        const date = selectedDate.toLocaleDateString();
        const time = selectedDate.toLocaleTimeString();
        const status = 'pending';

        firebase.database().ref(`Users/${localStorage.getItem('activeUId')}`)
            .once('value', mySnapshot => {
                const meetings = mySnapshot.val().meetings || [];

                meetings.push({
                    date,
                    time,
                    status,
                    ...selectedPlace,
                    nickName,
                    displayName,
                    displayPic,
                    requestDate: new Date().toLocaleDateString(),
                    requestTime: new Date().toLocaleTimeString()
                });
                
                firebase.database().ref(`Users/${localStorage.getItem('activeUId')}`)
                    .update({
                        meetings
                    })
                    .then(() => {
                        firebase.database().ref(`Users/${swappedUserId}`)
                            .once('value', snapshot => {
                                const notifications = snapshot.val().notifications || [];

                                notifications.push({
                                    date,
                                    time,
                                    status,
                                    ...selectedPlace,
                                    nickName: localStorage.getItem('myNickName'),
                                    requestedUId: localStorage.getItem('activeUId'),
                                    requestedUserMeetingIndex: notifications.length,
                                    displayName: localStorage.getItem('myDisplayName'),
                                    displayPic: localStorage.getItem('myDisplayPic'),
                                    notificationDate: new Date().toLocaleDateString(),
                                    notificationTime: new Date().toLocaleTimeString()
                                });

                                firebase.database().ref(`Users/${swappedUserId}`)
                                    .update({
                                        notifications
                                    })
                                    .then(() => {
                                        closeDateAndTimeDialog();
                                    })

                            });
                    })
            });
    };

    render() {
        const {
            classes,
            selectedPlace,
            isDateAndTimeDialog,
            closeDateAndTimeDialog
        } = this.props;

        const {
            fullScreen
        } = this.props;
        
        return (
            <form>
                <Dialog
                    fullScreen={fullScreen}
                    open={isDateAndTimeDialog}
                    onClose={closeDateAndTimeDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Select date & time for meeting.</DialogTitle>
                    <DialogContent>
                        <DateAndTime
                            onChange={this.handleDateChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            type='submit'
                            className={classes.button}
                            onClick={() => this.sendRequestForMeeting(selectedPlace)}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        );
    }
}

export default withMobileDialog({ breakpoint: 'xs' })(DateAndTimeDialog);