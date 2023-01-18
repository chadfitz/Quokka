import {Icon} from '@iconify/react';
import LocationIcon from '@iconify/icons-mdi/pin-outline';

const LocationMarker = ({lat, lng, onMouseOver, onMouseOut}) => {
  return (
    <div className='location-marker' onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        <Icon icon={LocationIcon} className="location-icon"/>
    </div>
  )
}

export default LocationMarker
