import React, { Component } from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';
import Routes from './routes';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

import AppBar from './components/AppBar/AppBar';

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

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
  >
    {
      props.isMarkerShown
      &&
      <Marker
        position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
        draggable={true}
        onDragEnd={position => {
          props.updateCoords({ latitude: position.latLng.lat(), longitude: position.latLng.lng() })
        }}
      />
    }
  </GoogleMap>
))

class App extends Component {
  constructor() {
    super();

    this.state = {
      coords: null,
      displayName: ''
    }
  }

  componentDidMount() {
    this.setPosition();
  }

  setPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        coords: position.coords
      })
    });
  }

  updateCoords = ({ latitude, longitude }) => {
    this.setState({ coords: { latitude, longitude } })
  }

  render() {
    const {
      coords
    } = this.state;

    return (
      <MuiThemeProvider  theme={theme}>
        <AppBar />
        <Routes />
        {/* {
          coords
          &&
          <MyMapComponent
            coords={coords}
            updateCoords={this.updateCoords}
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        } */}
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
