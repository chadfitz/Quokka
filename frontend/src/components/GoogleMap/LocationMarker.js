import {Icon} from '@iconify/react';
import LocationIcon from '@iconify/icons-mdi/pin-outline';

const LocationMarker = ({lat, lng, onClick}) => {
  return (
    <div className='location-marker' onClick={onClick}>
        <Icon icon={LocationIcon} className="location-icon"/>
    </div>
  )
}

export default LocationMarker
