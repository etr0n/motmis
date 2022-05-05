// import Menu from "../components/MainMenu"
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet"
// //import 'leaflet/dist/leaflet.css'
// import L from 'leaflet';
// import { useEffect } from 'react';
// import { useAppContext } from "../context/appContext";
// import { useState } from 'react';
// import Wrapper from '../../src/assets/wrappers/MapLayout'
// import MapSidebar from './../components/MapSidebar';

// // delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//     iconUrl: require('leaflet/dist/images/marker-icon.png'),
//     shadowUrl: require('leaflet/dist/images/marker-shadow.png')
// });

// const Map = () => {

//     const {
//         allUsersDevices,
//         getAllUsersDevices,
//         toggleMapSidebar,
//         user
//     } = useAppContext()

//     const [marker, setMarker] = useState()

//     useEffect(() => {
//         getAllUsersDevices()

//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [])
//     return (
//         <Wrapper>
//             <div>
//                 < Menu />
//                 <MapSidebar />
//                 <div>
//                     <MapContainer center={[55.606028440387156, 23.95855713856371]} zoom={7} minZoom={3} maxZoom={17} scrollWheelZoom={true} className={"leaflet-container"} >
//                         <TileLayer
//                             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         />
//                         {console.log(allUsersDevices)}
//                         <div className="updated-time">Last updated (time)</div>
//                         {Object.keys(allUsersDevices).map(function (key) {
//                             return (
//                                 <Marker key={key} position={[allUsersDevices[key].at(0).latitude, allUsersDevices[key].at(0).longitude]} eventHandlers={{ click: () => { setMarker(key); toggleMapSidebar(key) } }}  >
//                                 </Marker>
//                             )
//                         })}
//                     </MapContainer>
//                 </div>
//             </div>
//         </Wrapper>


//     )
// }

// export default Map

import MapWrapper from '../../src/assets/wrappers/Map'
import MapSidebar from './../components/MapSidebar';
import ReactDOM from "react-dom";
import { useAppContext } from "../context/appContext";
import Menu from "../components/MainMenu"
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import * as turf from '@turf/turf'
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoiZXRyb29uIiwiYSI6ImNsMnJ5OTZzaTBjZnQzam80YW13ZnJuY2oifQ.7doMPeORHk71UZ2F_lnxHg';


const Map = () => {
    const mapContainer = useRef(null)
    const map = useRef(null)
    const [lng, setLng] = useState(23.917754)
    const [lat, setLat] = useState(54.898871)
    const [zoom, setZoom] = useState(9)
    const {
        allUsersDevices,
        getAllUsersDevices,
        toggleMapSidebar,
        user
    } = useAppContext()

    const [users, setUsers] = useState(getAllUsersDevices)
    const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

    const generateClearances = () => {
        //console.log(allUsersDevices);
        let clearances = {};
        clearances.type = 'FeatureCollection';
        clearances.features = [];
        let feature = {};
        Object.keys(allUsersDevices).map(function (key) {
            feature.type = 'Feature';
            feature.geometry = {};
            feature.geometry.type = 'Point';
            feature.geometry.coordinates = [key.lat, key.long];
            clearances.features.push(feature);
            return (
                console.log("key")
            )
        })

    }

    const clearances = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [23.907021, 54.899303]
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [23.914494, 54.899006]
                }
            }
        ]
    }

    function drawPath() {
        console.log('drawing path');
    }
    // const show = () => {
    //     console.log('hello?');
    //     Object.keys(allUsersDevices).map(function (key) {
    //         return (
    //             console.log(key)
    //         )
    //     })
    // }


    useEffect(() => {
        users.then((value) => {

            console.log(value.allUsersDevices);
            if (map.current) return;

            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/light-v10',
                center: [lng, lat],
                zoom: zoom
            })
            const directions = new MapboxDirections({
                accessToken: mapboxgl.accessToken,
                unit: 'metric',
                profile: 'mapbox/driving',
                alternatives: 'false',
                geometries: 'geojson'
            })
            Object.keys(value.allUsersDevices).map(function (key) {
                //console.log(value.allUsersDevices[key].at(0).longitude, value.allUsersDevices[key].at(0).latitude, value.allUsersDevices[key].at(0).name);
                new mapboxgl.Marker({
                    color: "#000",
                    draggable: false
                }).setLngLat([value.allUsersDevices[key].at(0).longitude, value.allUsersDevices[key].at(0).latitude])
                    .addTo(map.current)
            })

            //map.current.addControl(directions, 'top-left');
            map.current.on('move', () => {
                setLng(map.current.getCenter().lng.toFixed(4));
                setLat(map.current.getCenter().lat.toFixed(4))
                setZoom(map.current.getZoom().toFixed(2))
            })
            const obstacle = turf.buffer(clearances, 0.05, { units: 'kilometers' })

            map.current.on('load', () => {
                map.current.addLayer({
                    id: 'clearances',
                    type: 'fill',
                    source: {
                        type: 'geojson',
                        data: obstacle
                    },
                    layout: {},
                    paint: {
                        'fill-color': '#f03b20',
                        'fill-opacity': 0.5,
                        'fill-outline-color': '#f03b20'
                    }
                })
                // setDataLoaded(true)
            })

            map.current.on("click", "clearances", e => {
                if (e.features.length) {
                    console.log(e.features.length);
                    const feature = e.features[0];
                    // create popup node
                    const popupNode = document.createElement("div");
                    ReactDOM.render(<MapSidebar feature={feature} />, popupNode);
                    // set popup on map
                    console.log(feature.geometry.coordinates);
                    popUpRef.current
                        .setLngLat(feature.geometry.coordinates)
                        .setDOMContent(popupNode)
                        .addTo(map);
                }
            });


            directions.on('route', (event) => {
                drawPath()
            }
            )
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <MapWrapper >
            {/* {console.log(allUsersDevices)} */}
            < Menu />
            <div>
                <div className="sidebar">
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>

                <div ref={mapContainer} className="map-container" />

            </div>
        </MapWrapper>
    )
}

export default Map