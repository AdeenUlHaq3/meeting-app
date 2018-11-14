import React from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const NickNameAndPhone = (props) => {
    const {
        classes,
        phoneNo,
        nickName,
        handleChange,
        handleSubmit
    } = props;

    return (
        <ValidatorForm
            className={classes.form}
            ref="form"
            onSubmit={handleSubmit}
            onError={errors => console.log(errors)}
        >
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
            {props.children}
        </ValidatorForm>
    );
}
export default NickNameAndPhone;