import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ConfirmationDialog extends React.Component {
  
  render() {
    const {
        isConfirmDialog,
        closeConfirmDialog,
        classes
    } = this.props.ConfirmationDialog;
    
    return (
      <div>
        <Dialog
          open={isConfirmDialog}
          onClose={() => closeConfirmDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to meet this person?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button className={classes.button} onClick={() => closeConfirmDialog(false)}>
              No
            </Button>
            <Button className={classes.button} onClick={() => closeConfirmDialog(true)} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ConfirmationDialog;