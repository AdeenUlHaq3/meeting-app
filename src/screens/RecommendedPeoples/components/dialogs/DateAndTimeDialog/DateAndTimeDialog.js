import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert2';

import firebase from '../../../../../config/firebase';

class DateAndTimeDialog extends React.Component {
    state = {
        date: (new Date(new Date().toLocaleString()).toISOString()).split('.')[0].split('T')[0],
        time: (new Date(new Date().toLocaleString()).toISOString()).split('.')[0].split('T')[1],
        open: false,
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    sendRequestForMeeting = (selectedPlace, date, time) => {
        const {
            swappedUserId,
            closeDateAndTimeDialog
        } = this.props.DateAndTimeDialog;

        firebase.database().ref(`Users/${swappedUserId}`)
            .once('value', snapshot => {
                const notifications = snapshot.val().notifications || [];

                notifications.push({
                    ...selectedPlace, date, time
                });

                firebase.database().ref(`Users/${swappedUserId}`)
                    .update({
                        notifications
                    })
                    .then(() => {
                        closeDateAndTimeDialog();
                        swal('Request Send');
                    })
                    
            });
    };

    render() {
        const {
            date,
            time
        } = this.state;

        const {
            classes,
            selectedPlace,
            isDateAndTimeDialog
        } = this.props.DateAndTimeDialog;

        return (
            <form>
                <Dialog
                    open={isDateAndTimeDialog}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Select date & time for meeting.</DialogTitle>
                    <DialogContent>

                    </DialogContent>
                    <TextField
                        name="date"
                        label="Date"
                        type="date"
                        value={date}
                        onChange={this.handleChange}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        name="time"
                        label="Time"
                        type="time"
                        value={time}
                        onChange={this.handleChange}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <DialogActions>
                        <Button
                            type='submit'
                            className={classes.button}
                            onClick={() => this.sendRequestForMeeting(selectedPlace, date, time)}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        );
    }
}

export default DateAndTimeDialog;