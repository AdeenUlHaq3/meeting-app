import React from 'react';

//Import Material UI Components
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const MeetingDuration = (props) => {
    const {
        classes,
        sixtyMin,
        twentyMin,
        oneTwentyMin,
        durationError,
        handleChange
    } = props;

    return (
        <FormControl required error={durationError} component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Select Meeting Duration</FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox name='twentyMin' checked={twentyMin[0]} onChange={(e) => handleChange(e, 'duration')} value='20' />
                    }
                    label="TwentyMin"
                />
                <FormControlLabel
                    control={
                        <Checkbox name='sixtyMin' checked={sixtyMin[0]} onChange={(e) => handleChange(e, 'duration')} value='60' />
                    }
                    label="SixtyMin"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name='oneTwentyMin'
                            checked={oneTwentyMin[0]}
                            onChange={(e) => handleChange(e, 'duration')}
                            value='120'
                        />
                    }
                    label="oneTwentyMin"
                />
            </FormGroup>
            <FormHelperText>Select at least one</FormHelperText>
        </FormControl>
    );
};

export default MeetingDuration;