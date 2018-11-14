import React from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';

const Form = (props) => {
    const {
        classes,
        handleSubmit
    } = props;

    return(
        <ValidatorForm
            className={classes.form}
            onSubmit={handleSubmit}
        >
            {props.children}
        </ValidatorForm>
    );
};

export default Form;