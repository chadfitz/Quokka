const LocationInfoBox = ({info}) => {
  return (
    <div className="location-info">
        {/* <h2> Info</h2> */}
        <ul>
            {/* <li>ID: <strong>{info.id}</strong></li> */}
            <strong>{info.title}</strong>
        </ul>
    </div>
  )
}

export default LocationInfoBox
