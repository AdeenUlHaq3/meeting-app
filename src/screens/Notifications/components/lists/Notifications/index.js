import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

//Import Moment
import moment from 'moment';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

const NotificationsList = (props) => {
  const { classes } = props;
  
  const {
    showDialog,
    notification
  } = props;

  return (
    <div key={`${notification.date} | ${notification.time}`} className={classes.root}>
      <List>
        <ListItem onClick={() => showDialog(notification)}>
          <img src={notification.displayPic} alt='displayPic' />
          <ListItemText primary={`${notification.displayName} (${notification.nickName}) wants to meet you at 
          ${notification.venue}, ${notification.address}`} secondary={moment(`${notification.notificationDate} ${notification.notificationTime}`, "MM/DD/YYYY HH:mm:ss a").fromNow()} />
        </ListItem>
      </List>
    </div>
  );
}

export default withStyles(styles)(NotificationsList);