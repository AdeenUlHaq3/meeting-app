import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import LocationOn from '@material-ui/icons/LocationOn';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

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
    name: {
        color: '#FE6B8B',
        textAlign: 'center'
    },
    inline: {
        display: 'inline'
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
                    <DialogTitle>
                        <p className={classes.name}>{request.displayName}</p>
                    </DialogTitle>
                    <DialogContent>
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
                            {moment(request.date).fromNow()}
                        </Typography>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default withMobileDialog({ breakpoint: 'xs' })(withStyles(styles)(RequestDialog));