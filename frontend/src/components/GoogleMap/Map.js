import { useState } from 'react';
import {useSelector} from 'react-redux';
import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker';
import LocationInfoBox from './LocationInfoBox';
import "./Map.css"

const Map = ({idNum, center, zoom}) => {
    const [locationInfo, setLocationInfo] = useState(null);
    const locationArray = useSelector(state => state.posts.user[0].location);
    console.log(locationArray)
    const lat = locationArray.coordinates[0];
    console.log(lat);
    const lng = locationArray.coordinates[1];
    console.log(lng)
  return (
    <div className='map'>
        <GoogleMapReact
            bootstrapURLKeys={{key:process.env.REACT_APP_MAPS_API_KEY}}
            defaultCenter={center}
            defaultZoom={zoom}
        >
            <LocationMarker
                lat={lat}
                lng={lng}
                onClick={()=> setLocationInfo({id: lat, title: lng})}
            />


        </GoogleMapReact>
        {/* {locationInfo && <LocationInfoBox info={locationInfo}/>} */}
    </div>
  )
}

Map.defaultProps = {
    center: {
        lat: 42.3265,
        lng: -122.8756
    },
    zoom: 6
}

export default Map
