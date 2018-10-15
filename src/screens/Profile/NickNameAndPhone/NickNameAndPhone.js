import React from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// JSS
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

class NickNameAndPhone extends React.Component {
    constructor() {
        super();

        this.state = {
            nickName: '',
            phoneNo: ''
        };
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const {
            nickName,
            phoneNo
        } = this.state;

        this.props.history.push('/profile/chooseImages', {nickName, phoneNo});
    };

    render() {
        const {
            nickName,
            phoneNo
        } = this.state;

        const {
            classes
        } = this.props;

        return (
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
                    validators={['matchRegexp:[0]{1}', 'required']}
                    errorMessages={['Type Mismatch']}
                    margin='normal'
                />
                <Button
                    type='submit'
                    variant="contained"
                    className={classes.button}
                >
                    Next
                </Button>
            </ValidatorForm>
        )
    }
}

export default withStyles(styles)(NickNameAndPhone);