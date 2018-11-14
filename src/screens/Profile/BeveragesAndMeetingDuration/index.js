import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

//Import Components
import Beverages from '../components/checkboxes/Beverages';
import MeetingDuration from '../components/checkboxes/MeetingDuration';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit * 3,
  },
});

class BeveragesAndMeetingDuration extends React.Component {
  state = {
    coffee: [false, '', 'drink'],
    juice: [false, '', 'drink'],
    cocktail: [false, '', 'drink'],
    twentyMin: [false, '', 'duration'],
    sixtyMin: [false, '', 'duration'],
    oneTwentyMin: [false, '', 'duration']
  };

  handleChange = (e, type) => this.setState({ [e.target.name] : [e.target.checked, e.target.value, type] });

  handleNext = e => {
    e.preventDefault();
    const {
      state
    } = this.props.location;
    
    let drinks = [], duration = [];

    for(let prop in this.state) {
      if(this.state[prop][0]){
        if(this.state[prop][2] === '_proto')
          return;
        else if(this.state[prop][2] === 'drink')
          drinks.push(this.state[prop][1]);
        else
          duration.push(parseInt(this.state[prop][1]));
      };
    };
    
    if(drinks.length && duration.length)
        this.props.history.push('/profile/selectLocation', {...state, drinks, duration});
  }

  render() {
    const { classes } = this.props;
    
    const { 
      coffee, 
      juice, 
      cocktail, 
      twentyMin, 
      sixtyMin, 
      oneTwentyMin 
    } = this.state;

    const drinkError = Object.values(this.state).filter(v => v[2] === 'drink' && v[0]).length <= 0;
    const durationError = Object.values(this.state).filter(v => v[2] === 'duration' && v[0]).length <= 0;
    
    return (
      <form onSubmit={this.handleNext}>
      <Grid container>
        <Beverages 
          juice={juice}
          coffee={coffee}
          classes={classes}
          cocktail={cocktail}
          drinkError={drinkError}
          handleChange={this.handleChange}
        />
        <MeetingDuration 
          classes={classes}
          sixtyMin={sixtyMin}
          twentyMin={twentyMin}
          oneTwentyMin={oneTwentyMin}
          durationError={durationError}
          handleChange={this.handleChange}
        />
        <Grid item lg={12}>
          <Button type='submit' className={classes.formControl}>Next</Button>
        </Grid>
        </Grid>
      </form>
    );
  }
}

export default withStyles(styles)(BeveragesAndMeetingDuration);