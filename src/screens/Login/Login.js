import React from 'react';
import Button from '@material-ui/core/Button';
import firebase from '../../config/firebase';

class Login extends React.Component {
    constructor() {
        super();

        this.state = {

        };
    };

    handleLogin = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(result => {
            this.props.history.push('/profile/nickNameAndPhone', {
                displayName: result.user.displayName,
            });
        })
        .catch(err => console.log(err));
    };

    render() {
        return (
            <Button onClick={this.handleLogin}>Login With Facebook</Button>
        );
    };
}

export default Login;