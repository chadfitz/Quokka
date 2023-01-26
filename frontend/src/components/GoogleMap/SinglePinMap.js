import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker';
import "./Map.css"

const styles =
// [
//     // {
//     //     "elementType": "labels.text",
//     //     "stylers": [
//     //         {
//     //             "visibility": "off"
//     //         }
//     //     ]
//     // },
//     {
//         "featureType": "landscape.natural",
//         "elementType": "geometry.fill",
//         "stylers": [
//             {
//                 "color": "#f5f5f2"
//             },
//             {
//                 "visibility": "on"
//             }
//         ]
//     },
//     // {
//     //     "featureType": "administrative",
//     //     "stylers": [
//     //         {
//     //             "visibility": "off"
//     //         }
//     //     ]
//     // },
//     // {
//     //     "featureType": "transit",
//     //     "stylers": [
//     //         {
//     //             "visibility": "off"
//     //         }
//     //     ]
//     // },
//     // {
//     //     "featureType": "poi.attraction",
//     //     "stylers": [
//     //         {
//     //             "visibility": "off"
//     //         }
//     //     ]
//     // },
//     {
//         "featureType": "landscape.man_made",
//         "elementType": "geometry.fill",
//         "stylers": [
//             {
//                 "color": "#ffffff"
//             },
//             {
//                 "visibility": "on"
//             }
//         ]
//     },
//     {
//         "featureType": "poi.business",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "poi.medical",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "poi.place_of_worship",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "poi.school",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "poi.sports_complex",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "color": "#ffffff"
//             },
//             {
//                 "visibility": "simplified"
//             }
//         ]
//     },
//     {
//         "featureType": "road.arterial",
//         "stylers": [
//             {
//                 "visibility": "simplified"
//             },
//             {
//                 "color": "#ffffff"
//             }
//         ]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "labels.icon",
//         "stylers": [
//             {
//                 "color": "#ffffff"
//             },
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     // {
//     //     "featureType": "road.highway",
//     //     "elementType": "labels.icon",
//     //     "stylers": [
//     //         {
//     //             "visibility": "off"
//     //         }
//     //     ]
//     // },
//     {
//         "featureType": "road.arterial",
//         "stylers": [
//             {
//                 "color": "#ffffff"
//             }
//         ]
//     },
//     {
//         "featureType": "road.local",
//         "stylers": [
//             {
//                 "color": "#ffffff"
//             }
//         ]
//     },
//     {
//         "featureType": "poi.park",
//         "elementType": "labels.icon",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "poi",
//         "elementType": "labels.icon",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "water",
//         "stylers": [
//             {
//                 "color": "#71c8d4"
//             }
//         ]
//     },
//     {
//         "featureType": "landscape",
//         "stylers": [
//             {
//                 "color": "#e5e8e7"
//             }
//         ]
//     },
//     {
//         "featureType": "poi.park",
//         "stylers": [
//             {
//                 "color": "#8ba129"
//             }
//         ]
//     },
//     {
//         "featureType": "road",
//         "stylers": [
//             {
//                 "color": "#ffffff"
//             }
//         ]
//     },
//     {
//         "featureType": "poi.sports_complex",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "color": "#c7c7c7"
//             },
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "water",
//         "stylers": [
//             {
//                 "color": "#a0d3d3"
//             }
//         ]
//     },
//     {
//         "featureType": "poi.park",
//         "stylers": [
//             {
//                 "color": "#91b65d"
//             }
//         ]
//     },
//     {
//         "featureType": "poi.park",
//         "stylers": [
//             {
//                 "gamma": 1.51
//             }
//         ]
//     },
//     {
//         "featureType": "road.local",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "road.local",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "visibility": "on"
//             }
//         ]
//     },
//     {
//         "featureType": "poi.government",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "landscape",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "road",
//         "elementType": "labels",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "road.arterial",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "visibility": "simplified"
//             }
//         ]
//     },
//     {
//         "featureType": "road.local",
//         "stylers": [
//             {
//                 "visibility": "simplified"
//             }
//         ]
//     },
//     {
//         "featureType": "road"
//     },
//     {
//         "featureType": "road"
//     },
//     {},
//     {
//         "featureType": "road.highway"
//     }
// ]

[
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f7f1df"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#d0e3b4"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#fbd3da"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#bde6ab"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffe15f"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#efd151"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "black"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#cfb2db"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#a2daf2"
            }
        ]
    }
]

const SinglePinMap = ({lat, lng}) => {
    const mapOptions = {
        disableDefaultUI: true,
        hide: [
            {
              featureType: "poi.business",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "transit",
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }],
            },
          ],
        // mapTypeId: "terrain",
        styles: styles
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
