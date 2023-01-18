import { useState } from 'react';
import {useSelector} from 'react-redux';
import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker';
import LocationInfoBox from './LocationInfoBox';
import "./Map.css";
import Loader from './Loader';

const AllPinsMap = ({userPosts, zoom}) => {
    const [locationInfo, setLocationInfo] = useState(null);

    

  return (
    <div className='all-pins-map'>
        <GoogleMapReact
            bootstrapURLKeys={{key:process.env.REACT_APP_MAPS_API_KEY}}
            defaultCenter={{lat: 38, lng: -122}}
            defaultZoom={zoom}
        >
        {userPosts.map((post) =>
            <LocationMarker
                key={post._id}
                lat={post.location.coordinates[1]}
                lng={post.location.coordinates[0]}
                onMouseOver={()=> setLocationInfo({ title: post.subject})}
                onMouseOut={()=> setLocationInfo(false)}
            />
        )}
        </GoogleMapReact>
        {(locationInfo) && <LocationInfoBox info={locationInfo}/>}

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
