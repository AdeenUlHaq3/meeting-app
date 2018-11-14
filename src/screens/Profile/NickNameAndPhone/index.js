import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

//Import Components
import ValidatorForm from '../components/forms/ValidatorForm';
import NickNameAndPhoneTextFields from '../components/textfields/NickNameAndPhone';

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
    state = {
        nickName: '',
        phoneNo: ''
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

        const {
            state
        } = this.props.location;

        this.props.history.push('/profile/chooseImages', { ...state, nickName, phoneNo });
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
                classes={classes}
                handleSubmit={this.handleSubmit}
            >
                <NickNameAndPhoneTextFields
                    classes={classes}
                    nickName={nickName}
                    phoneNo={phoneNo}
                    handleChange={this.handleChange}
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

const mapStateToProps = (state) => {
    return {
        nickName: state.nickNameAndPhoneReducer.nickName,
        phone: state.nickNameAndPhoneReducer.phone
    };
};

export default withStyles(styles)(connect(mapStateToProps, null)(NickNameAndPhone));