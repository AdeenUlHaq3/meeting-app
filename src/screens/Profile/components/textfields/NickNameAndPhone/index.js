import React from 'react';
import { TextValidator } from 'react-material-ui-form-validator';

const NickNameAndPhone = (props) => {
    const {
        classes,
        phoneNo,
        nickName,
        handleChange
    } = props;

    return (
        <div>
            <TextValidator
                label="Nick Name"
                name="nickName"
                className={classes.textField}
                onChange={handleChange}
                value={nickName}
                validators={['matchRegexp:[a-z,A-Z]{1}', 'required']}
                errorMessages={['Type Mismatch']}
                margin='normal'
            />
            <TextValidator
                label="Phone No."
                name="phoneNo"
                className={classes.textField}
                onChange={handleChange}
                value={phoneNo}
                validators={['matchRegexp:[0]{1}[3]{1}[0-9]{2}[-]{1}[0-9]{7}', 'required']}
                errorMessages={['Type Mismatch']}
                margin='normal'
            />
        </div>
    );
}
export default NickNameAndPhone;