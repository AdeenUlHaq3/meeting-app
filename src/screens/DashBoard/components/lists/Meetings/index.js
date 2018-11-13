import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import LocationOn from '@material-ui/icons/LocationOn';

//Import Moment
import moment from 'moment';

const styles = theme => ({
  root: {
    width: '100%',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  secondaryText: {
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  button: {
    background: 'transparent',
    color: '#FE6B8B',
    boxShadow: 'none',
  },
  round: {
    borderRadius: '50%',
  },
  margin: {
      marginTop: theme.spacing.unit * 2
  },
  textCenter: {
      textAlign: 'center',
  },
});

const Meetings = (props) => {
  let list = [];

  const {
    value,
    lists,
    classes,
    Loading
  } = props;

  switch (value) {
    case 0:
      list = lists.accepted;
      break;
    case 1:
      list = lists.cancelled;
      break;
    case 2:
      list = lists.complicated;
      break;
    case 3:
      list = lists.done;
      break;
    case 4:
      list = lists.pending;
      break;
    default:
      break;
  }

  return (
    Loading
    ?
    <Typography
        variant='display1'
        className={`${classes.textCenter} ${classes.margin}`}
    >
        Loading...
    </Typography>
    :
    list.length ?
    list.map(item =>
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <img src={item.displayPic} className={classes.round} alt='Fb Pic' />&nbsp;
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>{item.displayName} ({item.nickName})</Typography>
              <Typography className={classes.secondaryText} variant='caption'>{moment(`${item.requestDate} ${item.requestTime}`, "MM/DD/YYYY HH:mm:ss a").fromNow()}</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>status: {item.status}</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classNames(classes.column, classes.helper)}>
              <LocationOn />
              <Typography variant="caption">
                At {item.address}
              </Typography>
              <Typography variant="caption">
                {item.date} | {item.time}
              </Typography>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Divider light={true} />
      </div>
    )
    :
    <Typography
        variant='display1'
        className={`${classes.textCenter} ${classes.margin}`}
    >
        No meetings yet.
    </Typography>
  );
}

export default withStyles(styles)(Meetings);