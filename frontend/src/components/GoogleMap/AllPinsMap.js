import { useState } from 'react';
import {useSelector} from 'react-redux';
import GoogleMapReact from 'google-map-react';
import LocationMarkerAllPins from './LocationMarkerAllPins';
import LocationInfoBox from './LocationInfoBox';
import "./Map.css";
import Loader from './Loader';


const AllPinsMap = ({userPosts, zoom, center}) => {
  const [locationInfo, setLocationInfo] = useState(null);

  return (
    <div className='all-pins-map'>
        <GoogleMapReact
            bootstrapURLKeys={{key:process.env.REACT_APP_MAPS_API_KEY}}
            zoom={zoom}
            center={center}
        >
        {userPosts.map((post) =>
            <LocationMarkerAllPins
                key={post._id}
                lat={post.location.coordinates[1]}
                lng={post.location.coordinates[0]}
                post={post}
                onMouseOver={()=> setLocationInfo({ title: post.subject})}
                onMouseOut={()=> setLocationInfo(false)}
            />
        )}
        </GoogleMapReact>
        {(locationInfo) && <LocationInfoBox info={locationInfo}/>}

    </div>
  )
}

export default AllPinsMap
