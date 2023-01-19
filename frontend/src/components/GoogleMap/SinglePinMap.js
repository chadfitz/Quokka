import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker';
import "./Map.css"

// const styles = {
//   silver: [
//       {
//         elementType: "geometry",
//         stylers: [{ color: "#f5f5f5" }],
//       },
//       {
//         elementType: "labels.icon",
//         stylers: [{ visibility: "off" }],
//       },
//       {
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#616161" }],
//       },
//       {
//         elementType: "labels.text.stroke",
//         stylers: [{ color: "#f5f5f5" }],
//       },
//       {
//         featureType: "administrative.land_parcel",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#bdbdbd" }],
//       },
//       {
//         featureType: "poi",
//         elementType: "geometry",
//         stylers: [{ color: "#eeeeee" }],
//       },
//       {
//         featureType: "poi",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#757575" }],
//       },
//       {
//         featureType: "poi.park",
//         elementType: "geometry",
//         stylers: [{ color: "#e5e5e5" }],
//       },
//       {
//         featureType: "poi.park",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#9e9e9e" }],
//       },
//       {
//         featureType: "road",
//         elementType: "geometry",
//         stylers: [{ color: "#ffffff" }],
//       },
//       {
//         featureType: "road.arterial",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#757575" }],
//       },
//       {
//         featureType: "road.highway",
//         elementType: "geometry",
//         stylers: [{ color: "#dadada" }],
//       },
//       {
//         featureType: "road.highway",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#616161" }],
//       },
//       {
//         featureType: "road.local",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#9e9e9e" }],
//       },
//       {
//         featureType: "transit.line",
//         elementType: "geometry",
//         stylers: [{ color: "#e5e5e5" }],
//       },
//       {
//         featureType: "transit.station",
//         elementType: "geometry",
//         stylers: [{ color: "#eeeeee" }],
//       },
//       {
//         featureType: "water",
//         elementType: "geometry",
//         stylers: [{ color: "#c9c9c9" }],
//       },
//       {
//         featureType: "water",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#9e9e9e" }],
//       }
//     ]
// }
const SinglePinMap = ({lat, lng}) => {
    const mapOptions = {
        disableDefaultUI: true,
        // styles: styles[2]
    }


  return (
    <div className='map'>
        <GoogleMapReact
            bootstrapURLKeys={{key:process.env.REACT_APP_MAPS_API_KEY}}
            defaultCenter={{lat: lat, lng: lng}}
            defaultZoom={10}
            yesIWantToUseGoogleMapApiInternals
            options={mapOptions}
            // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
            <LocationMarker
                lat={lat}
                lng={lng}
            />
        </GoogleMapReact>
    </div>
  )
}

export default SinglePinMap
