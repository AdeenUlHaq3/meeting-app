import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import DateAndTime from './components/DateAndTime';

import firebase from '../../../../../config/firebase';

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
            swappedUserId,
            closeDateAndTimeDialog
        } = this.props.DateAndTimeDialog;

        firebase.database().ref(`Users/${swappedUserId}`)
            .once('value', snapshot => {
                const notifications = snapshot.val().notifications || [];
                const date = selectedDate.toLocaleDateString();
                const time = selectedDate.toLocaleTimeString();
                notifications.push({
                    ...selectedPlace,
                    date,
                    time
                });

                firebase.database().ref(`Users/${swappedUserId}`)
                    .update({
                        notifications
                    })
                    .then(() => {
                        closeDateAndTimeDialog();
                    })

            });
    };

    render() {
        const {
            classes,
            selectedPlace,
            isDateAndTimeDialog,
            closeDateAndTimeDialog
        } = this.props.DateAndTimeDialog;

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