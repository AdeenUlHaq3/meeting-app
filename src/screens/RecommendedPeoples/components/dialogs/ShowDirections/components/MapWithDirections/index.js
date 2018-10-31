import React from 'react';
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer, withScriptjs } from "react-google-maps"

const MapWithDirections = (props) =>
  <MyMapComponent
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `100vh` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    directions={props.directions}
  />


const MyMapComponent = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={14}
    center={{ lat: 24.8812296, lng: 67.0727269 }}
  >
    <Marker position={{ lat: 24.8812296, lng: 67.0727269 }} />
    <Marker position={{ lat: 24.8861479, lng: 67.0595196 }} />

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