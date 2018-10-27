import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Label from '@material-ui/icons/Label';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

function NotificationsList(props) {
  const { classes } = props;
  
  const {
    notification
  } = props.NotificationsList;

  return (
    <div className={classes.root}>
      <List>
        <ListItem>
          <Avatar>
            <Label />
          </Avatar>
          <ListItemText primary={`${notification.venue}, ${notification.address}`} secondary={`${notification.date} | ${notification.time}`} />
        </ListItem>
      </List>
    </div>
  );
}

NotificationsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotificationsList);