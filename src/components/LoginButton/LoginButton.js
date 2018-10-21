import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import firebase from '../../config/firebase';

function handleLogin(history, activeUser) {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
        const myUId = firebase.auth().currentUser.uid;
        
        firebase.database().ref(`Users/${myUId}`)
        .once('value', snapshot => {
            activeUser();

            if (snapshot.val())
                return history.push('/dashboard');

            history.push('/profile/nickNameAndPhone', {
                displayName: result.user.displayName,
            });
        });
    })
        .catch(err => console.log(err));
};

const styles = {
    button: {
        float: 'right'
    },
};

const LoginButton = (props) => {
    const {
        history,
        activeUser
    } = props;

    return (
        <Button className={props.classes.button} onClick={() => handleLogin(history, activeUser)}>Login With Facebook</Button>
    );
};

export default withStyles(styles)(withRouter(LoginButton));