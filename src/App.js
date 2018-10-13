import React, { Component } from 'react';
import './App.css';
import firebase from './config/firebase';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

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
            props.updateCoords({latitude: position.latLng.lat(), longitude: position.latLng.lng()})
        }}
      />
    }
  </GoogleMap>
))

class App extends Component {
  constructor() {
    super();

    this.state = {
      coords: null
    }
  }

  handleLogin = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {

    }).catch(function (error) {

    });
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
      <div>
        {/* <button onClick={ this.handleLogin }>Facebook Login</button> */}
        {
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
        }
      </div>
    );
  }
}

export default App;
