import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker';
import "./Map.css"

const SinglePinMap = ({lat, lng}) => {
    const mapOptions = {
        disableDefaultUI: true
    }

  return (
    <div className='map'>
        <GoogleMapReact
            bootstrapURLKeys={{key:process.env.REACT_APP_MAPS_API_KEY}}
            defaultCenter={{lat: lat, lng: lng}}
            defaultZoom={5}
            yesIWantToUseGoogleMapApiInternals
            options={mapOptions}
            // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
            <LocationMarker
                lat={lat}
                lng={lng}
            />
        </GoogleMapReact>
    </div>
  )
}

export default SinglePinMap
