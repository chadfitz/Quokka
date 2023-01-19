import React, { useState } from 'react'
import GoogleMapReact from "google-map-react";
import LocationMarker from './LocationMarker';


const AnyReactComponent = ({ text }) => <div id="map-pin">{text}</div>;

const MapCoordinates = ({lat, setLat, lng, setLng}) => {
    const defaultProps = {
        center: {
            lat: 37.776392,
            lng: -122.4194

        },
        zoom: 13
    };
    // const [lat, setLat] = useState(37.776392)
    // const [lng, setLng] = useState(-122.4194)

  const mapOptions={
    fullscreenControl: false,
    disableDefaultUI : true
  }

  const getCoordinates = (e)=>{
    setLat(e.lat);
    setLng(e.lng);
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '400px', width: '400px' }}>
      <GoogleMapReact onClick={getCoordinates}
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
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
