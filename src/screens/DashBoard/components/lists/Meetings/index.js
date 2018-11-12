import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
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
  }
});

const Meetings = (props) => {
  let list = [];

  const {
    value,
    lists,
    classes
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
    list.map(item =>
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.column}>
              <Typography className={classes.heading}>{item.displayName} ({item.nickName})</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>status: {item.status}</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classNames(classes.column, classes.helper)}>
              <Typography variant="caption">
                Select your destination of choice
              </Typography>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Divider light={true} />
      </div>
    )
  );
}

export default withStyles(styles)(Meetings);