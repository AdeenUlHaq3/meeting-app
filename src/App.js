import React, { Component } from 'react';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

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
    MuiButton: {
      // Name of the rule
      root: {
        // Some CSS
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 0,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    },
  },
})

class App extends Component {
  state = {
    isUser: false
  }

  activeUser = () => {
    this.setState({
      isUser: true
    })
  }

  render() {
    const {
      isUser
    } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <Routes Routes={{isUser, activeUser: this.activeUser}} />
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);