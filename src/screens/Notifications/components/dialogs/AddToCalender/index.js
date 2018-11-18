import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { withStyles } from '@material-ui/core/styles';

//Import Components
import AddToCalender from 'react-add-to-calendar';

const styles = {
    dropdown: {
        width: '500px',
        height: '100px'
    },
};

class ConfirmationDialog extends React.Component {

    render() {
        const {
            open,
            close,
            fullScreen,
            event,
            listItems
        } = this.props;

        return (
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Add this event to calender.</DialogTitle>
                <div>
                    <AddToCalender
                        event={event}
                        listItems={listItems}
                    />
                </div>
            </Dialog>
        );
    }
}

export default withMobileDialog({ breakpoint: 'xs' })(withStyles(styles)(ConfirmationDialog));