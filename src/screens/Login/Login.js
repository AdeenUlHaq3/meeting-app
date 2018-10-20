import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles'; 
import firebase from '../../config/firebase';

function handleLogin(history) {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
        console.log(result);
        
        history.push('/profile/nickNameAndPhone', {
            displayName: result.user.displayName,
        });
    })
    .catch(err => console.log(err));
};

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 3,
  },
});

const Login = (props) => <Button className={props.classes.button} onClick={() => handleLogin(props.history)}>Login With Facebook</Button>

export default withStyles(styles)(Login);