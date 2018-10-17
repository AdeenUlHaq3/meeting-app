import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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
          duration.push(this.state[prop][1]);
      };
    };
    
    if(drinks.length && duration.length)
        this.props.history.push('/profile/selectLocation', {...state, ...{drinks, duration}});
  }

  render() {
    const { classes } = this.props;
    const { coffee, juice, cocktail, twentyMin, sixtyMin, oneTwentyMin } = this.state;
    const drinkError = Object.values(this.state).filter(v => v[2] === 'drink' && v[0]).length <= 0;
    const durationError = Object.values(this.state).filter(v => v[2] === 'duration' && v[0]).length <= 0;

    return (
      <form onSubmit={this.handleNext}>
      <Grid container>
        <FormControl required error={drinkError} component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Select Drinks</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox name='coffee' checked={coffee[0]} onChange={(e) => this.handleChange(e, 'drink')} value="coffee" />
              }
              label="Coffee"
            />
            <FormControlLabel
              control={
                <Checkbox name='juice' checked={juice[0]} onChange={(e) => this.handleChange(e, 'drink')} value="juice" />
              }
              label="Juice"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name='cocktail'
                  checked={cocktail[0]}
                  onChange={(e) => this.handleChange(e, 'drink')}
                  value="cocktail"
                />
              }
              label="Cocktail"
            />
          </FormGroup>
          <FormHelperText>Select at least one</FormHelperText>
        </FormControl>
        <FormControl required error={durationError} component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Select Meeting Duration</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox name='twentyMin' checked={twentyMin[0]} onChange={(e) => this.handleChange(e, 'duration')} value="twentyMin" />
              }
              label="TwentyMin"
            />
            <FormControlLabel
              control={
                <Checkbox name='sixtyMin' checked={sixtyMin[0]} onChange={(e) => this.handleChange(e, 'duration')} value="sixtyMin" />
              }
              label="SixtyMin"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name='oneTwentyMin'
                  checked={oneTwentyMin[0]}
                  onChange={(e) => this.handleChange(e, 'duration')}
                  value="oneTwentyMin"
                />
              }
              label="oneTwentyMin"
            />
          </FormGroup>
          <FormHelperText>Select at least one</FormHelperText>
        </FormControl>
        <Grid item lg={12}>
          <Button type='submit' className={classes.formControl}>Next</Button>
        </Grid>
        </Grid>
      </form>
    );
  }
}

BeveragesAndMeetingDuration.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BeveragesAndMeetingDuration);