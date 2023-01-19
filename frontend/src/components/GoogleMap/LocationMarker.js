import {Icon} from '@iconify/react';
import LocationIcon from '@iconify/icons-mdi/cat';

const LocationMarker = ({lat, lng, onMouseOver, onMouseOut, onClick}) => {
  return (
    <div className='location-marker' onMouseOver={onMouseOver} onMouseOut={onMouseOut} onClick={onClick}>
        <Icon icon={LocationIcon} className="location-icon"/>
    </div>
  )
}

export default LocationMarker
