import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import firebase from '../../config/Firebase';

function handleLogin(history, activeUser) {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
        const myUId = firebase.auth().currentUser.uid;
        localStorage.setItem('activeUId', myUId);

        firebase.database().ref(`Users/${myUId}`)
        .once('value', snapshot => {
            activeUser();
            localStorage.setItem('myDisplayPic', result.user.photoURL);
            localStorage.setItem('myDisplayName', result.user.displayName);
            
            if (snapshot.val())
                return history.push('/dashboard');

            history.push('/profile/nickNameAndPhone', {
                displayName: result.user.displayName,
                displayPic: result.user.photoURL
            });
        });
    })
        .catch(err => console.log(err));
};

const styles = {
    button: {
        position: 'absolute',
        right: '20px',
        float: 'right !important',
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