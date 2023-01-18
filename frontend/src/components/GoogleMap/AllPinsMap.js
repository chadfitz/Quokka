import { useState } from 'react';
import {useSelector} from 'react-redux';
import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker';
import LocationInfoBox from './LocationInfoBox';
import "./Map.css";
import Loader from './Loader';

const AllPinsMap = ({userPosts}) => {
    const [locationInfo, setLocationInfo] = useState(null);

  return (
    <div className='all-pins-map'>
        <GoogleMapReact
            bootstrapURLKeys={{key:process.env.REACT_APP_MAPS_API_KEY}}
            defaultCenter={{lat: 38, lng: -122}}
            defaultZoom={3}
        >
        {userPosts.map((post) =>
            <LocationMarker
                lat={post.location.coordinates[1]}
                lng={post.location.coordinates[0]}
                // onClick={()=> setLocationInfo({id: lat, title: lng})}
            />
        )}
        </GoogleMapReact>
        {/* {locationInfo && <LocationInfoBox info={locationInfo}/>} */}
    </div>
  )
}

// Map.defaultProps = {
//     center: {
//         lat: 42.3265,
//         lng: -122.8756
//     },
//     zoom: 6
// }

export default AllPinsMap
