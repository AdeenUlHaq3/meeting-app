import React from 'react';
import Button from '@material-ui/core/Button';
import firebase from '../../config/firebase';

function handleLogin(history) {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
        history.push('/profile/nickNameAndPhone', {
            displayName: result.user.displayName,
        });
    })
    .catch(err => console.log(err));
};

const Login = (props) => <Button onClick={() => handleLogin(props.history)}>Login With Facebook</Button>

export default Login;