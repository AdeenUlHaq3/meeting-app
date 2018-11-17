import React, { Component } from 'react';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

//Import Firebase Config
import firebase from './config/Firebase';

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
  shadows: Array(25).fill('none'), //['none']
})

class App extends Component {
  state = {
    isUser: false,
    notifications: [],
    pendingNotifications: 0
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isUser)
      if (prevState.isUser !== this.state.isUser)
        firebase.database().ref(`Users/${localStorage.getItem('activeUId')}`)
          .once('value', snapshot => {

            if (snapshot.val()) {
              const notifications = snapshot.val().notifications || [];

              const pendingNotifications = notifications.filter(notification => notification.status === 'pending' && notification)

              this.setState({
                notifications,
                pendingNotifications: pendingNotifications.length || 0
              });
            }
          });
  };

  componentDidMount() {
    if (localStorage.getItem('activeUId')) {
      const {
        pathname
      } = this.props.history.location;

      this.setState({
        isUser: true
      });

      if (pathname === '/')
        this.props.history.push('/dashboard');
    }
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

        localStorage.removeItem('activeUId');
        this.props.history.push('/');
      });
  }

  render() {
    const {
      isUser,
      notifications,
      pendingNotifications
    } = this.state;

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MuiThemeProvider theme={theme}>
            <Routes Routes={{ isUser, notifications, pendingNotifications, activeUser: this.activeUser, logOut: this.logOut }} />
          </MuiThemeProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default withRouter(App);