import {Icon} from '@iconify/react';
import LocationIcon from '@iconify/icons-mdi/cat';
import { useHistory } from 'react-router-dom';

const LocationMarkerAllPins = ({lat, lng, post, onMouseOver, onMouseOut}) => {
  const history = useHistory();
  const handlePinClick = (post) => {
    history.push(`/posts/${post._id}`)
  }
  return (
    <div className='location-marker' onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        <Icon icon={LocationIcon} className="location-icon" onClick={() => handlePinClick(post)} />
    </div>
  )
}

export default LocationMarkerAllPins
