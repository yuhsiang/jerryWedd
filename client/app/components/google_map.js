import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';


const CityGoogleMap = props => (
  <GoogleMapLoader
    containerElement={
      <div
        style={{
          height: '100%',
        }}
      />
    }
    googleMapElement={
      <GoogleMap
        defaultZoom={17}
        defaultCenter={{ lat: props.lat, lng: props.lon }}
      >
      <Marker
        position= {{
          lat: props.lat,
          lng: props.lon}}
        key={props.name}
        defaultAnimation= {2}
        />
      </GoogleMap>
    }
  />
);
export default CityGoogleMap;
