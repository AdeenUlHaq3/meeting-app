import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const styles = theme => ({
    textField: {
        width: '100%',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    form: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '40%'
    },
    button: {
        color: 'white',
        marginTop: 10,
        float: 'right'
    }
});

class EditProfile extends React.Component {
    state = {
        nickName: '',
        phoneNo: ''
    };

    render() {
        const {
            phoneNo,
            nickName
        } = this.state;
        const {
            classes
        } = this.props;

        return(
            <ValidatorForm
                className={classes.form}
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
                <TextValidator
                    label="Nick Name"
                    name="nickName"
                    className={classes.textField}
                    onChange={this.handleChange}
                    value={nickName}
                    validators={['matchRegexp:[a-z,A-Z]{1}', 'required']}
                    errorMessages={['Type Mismatch']}
                    margin='normal'
                />
                <TextValidator
                    label="Phone No."
                    name="phoneNo"
                    className={classes.textField}
                    onChange={this.handleChange}
                    value={phoneNo}
                    validators={['matchRegexp:[0]{1}[3]{1}[0-9]{2}[-]{1}[0-9]{7}', 'required']}
                    errorMessages={['Type Mismatch']}
                    margin='normal'
                />
            </ValidatorForm>
        );
    };
};

export default withStyles(styles)(EditProfile);