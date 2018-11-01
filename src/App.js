import React, { Component } from 'react';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

//Import Firebase Config
import firebase from './config/firebase';

//Import Routes
import Routes from './routes';

//Creating Theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FE6B8B',
      contrastText: '#fff'
    },
    secondary: {
      main: '#555',
      contrastText: '#fff'
    },
  },
  typography: {
    useNextVariants: true,
  },
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiPickersModal: {
      dialogAction: {
        background: 'transparent',
        color: '#FE6B8B',
      },
    },
    MuiButton: {
      // Name of the rule
      root: {
        // Some CSS
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 0,
        color: 'white',
        height: 48,
        fontWeight: 'bold',
        padding: '0 30px',
      },
    },
  },
})

class App extends Component {
  state = {
    isUser: false,
    notifications: []
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isUser)
      if (prevState.isUser !== this.state.isUser)
        firebase.database().ref(`Users/${firebase.auth().currentUser.uid}`)
          .once('value', snapshot => {

            const notifications = snapshot.val().notifications || [];

            this.setState({
              notifications
            });

          });
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        localStorage.setItem('uid', user.uid);
        this.setState({
          isUser: true
        });
        this.props.history.push('/dashboard');
      };
    });
  };

  activeUser = () => {
    this.setState({
      isUser: true
    });
  };

  logOut = () => {
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          isUser: false

        });
        this.props.history.push('/');
      });
  }

  render() {
    const {
      isUser,
      notifications
    } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <Routes Routes={{ isUser, notifications, activeUser: this.activeUser, logOut: this.logOut }} />
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);