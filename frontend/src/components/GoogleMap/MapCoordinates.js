import React, { useState } from 'react'
import GoogleMapReact from "google-map-react";
import LocationMarker from './LocationMarker';


const AnyReactComponent = ({ text }) => <div id="map-pin">{text}</div>;

const MapCoordinates = ({lat, setLat, lng, setLng, center}) => {
  const defaultProps = { zoom: 10 };
  const mapOptions = {
    // fullscreenControl: false,
    // disableDefaultUI : true
  }

  const getCoordinates = (e) => {
    setLat(e.lat);
    setLng(e.lng);
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '430px', width: '400px' }}>
      <GoogleMapReact onClick={getCoordinates}
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
        defaultCenter={center}
        defaultZoom={defaultProps.zoom}
        options = {mapOptions}
        draggable={true}
        yesIWantToUseGoogleMapApiInternals
      >
        <LocationMarker
                lat={lat}
                lng={lng}
                // onClick={()=> setLocationInfo({id: lat, title: lng})}
            />

        {/* <AnyReactComponent latitude={lat} setLongitude={lng}
        lat={defaultProps.center.lat}
        lng ={defaultProps.center.lng}
        /> */}
      </GoogleMapReact>
    </div>
  );
}

export default MapCoordinates;
