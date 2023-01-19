import {Icon} from '@iconify/react';
import LocationIcon from '@iconify/icons-mdi/cat';

const LocationMarker = ({lat, lng, post, onMouseOver, onMouseOut}) => {

  return (
    <div className='location-marker' onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        <Icon icon={LocationIcon} className="location-icon" />
    </div>
  )
}

export default LocationMarker
