import React from 'react';
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer, withScriptjs } from "react-google-maps"

const MapWithDirections = (props) =>
  <MyMapComponent
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `100vh` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    directions={props.directions}
    myLat={props.myLat}
    myLng={props.myLng}
    meetPlaceLat={props.meetPlaceLat}
    meetPlaceLng={props.meetPlaceLng}
  />


const MyMapComponent = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={14}
    center={{ lat: props.myLat, lng: props.myLng }}
  >
    <Marker position={{ lat: props.myLat, lng: props.myLng }} />
    <Marker position={{ lat: props.meetPlaceLat, lng: props.meetPlaceLng }} />

    {
      props.directions
      && 
      <DirectionsRenderer 
        directions={props.directions} 
      />
    }
  </GoogleMap>
));

export default MapWithDirections;