import React from 'react';

//Import Material UI Components
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const Beverages = (props) => {
    const {
        juice,
        coffee,
        classes,
        cocktail,
        drinkError,
        handleChange
    } = props;

    return(
        <FormControl required error={drinkError} component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Select Drinks</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox name='coffee' checked={coffee[0]} onChange={(e) => handleChange(e, 'drink')} value="coffee" />
              }
              label="Coffee"
            />
            <FormControlLabel
              control={
                <Checkbox name='juice' checked={juice[0]} onChange={(e) => handleChange(e, 'drink')} value="juice" />
              }
              label="Juice"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name='cocktail'
                  checked={cocktail[0]}
                  onChange={(e) => handleChange(e, 'drink')}
                  value="cocktail"
                />
              }
              label="Cocktail"
            />
          </FormGroup>
          <FormHelperText>Select at least one</FormHelperText>
        </FormControl>
    );
};

export default Beverages;