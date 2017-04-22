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
        onClick={()=>{
          console.log('click');
          var a = document.createElement('a');
          a.target = '_blank';
          a.href = `https://maps.google.com/?q=${props.lat},${props.lon}`;
          a.click();
          // window.open(`https://maps.google.com/?q=${props.lat},${props.lon}`, '_blank');
        }}
        />
      </GoogleMap>
    }
  />
);
export default CityGoogleMap;
