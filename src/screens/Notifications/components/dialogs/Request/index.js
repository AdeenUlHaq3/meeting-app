import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import LocationOn from '@material-ui/icons/LocationOn';
import { withStyles } from '@material-ui/core/styles';
import { Typography, DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';

//Import Moment
import moment from 'moment';

const styles = {
    avatar: {
        borderRadius: '50%',
        width: '70px',
        height: '70px',
        display: 'inline',
        float: 'left'
    },
    center: {
        textAlign: 'center'
    },
    name: {
        color: '#FE6B8B',
    },
    inline: {
        display: 'inline'
    },
    button: {
        background: 'transparent',
        boxShadow: 'none',
        color: '#FE6B8B'
    }
};

class RequestDialog extends React.Component {

    render() {
        const {
            open,
            close,
            request,
            classes,
            fullScreen
        } = this.props;
        
        return (
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={close}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <img className={classes.avatar} src={request.displayPic} alt='Avatar' />
                    <img className={classes.avatar} src={request.displayPic} alt='Avatar' />
                    <DialogContent className={classes.center}>
                    <Typography 
                        variant='h6'
                        className={classes.name}
                    >
                        {request.displayName}
                    </Typography>
                    <DialogContentText>
                        <LocationOn className={classes.inline} />
                        <Typography 
                            className={classes.inline} 
                            variant='subtitle2' 
                        >
                            {request.address}
                        </Typography>  
                        <Typography
                            variant='caption'
                        >
                            Date: {request.date}<br/>
                            Time: {request.time}<br/>
                            {moment(request.date).fromNow()}
                        </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                            <Button className={classes.button} onClick={() => close(false)}>
                            Cancel
                            </Button>
                            <Button className={classes.button} onClick={() => close(true)} autoFocus>
                            Confirm
                            </Button>
                        </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withMobileDialog({ breakpoint: 'xs' })(withStyles(styles)(RequestDialog));