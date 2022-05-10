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
import polyline from '@mapbox/polyline';
mapboxgl.accessToken = 'pk.eyJ1IjoiZXRyb29uIiwiYSI6ImNsMnJ5OTZzaTBjZnQzam80YW13ZnJuY2oifQ.7doMPeORHk71UZ2F_lnxHg';


const Map = () => {
    const mapContainer = useRef(null)
    const map = useRef(null)
    const directions = useRef(null)

    const [lng, setLng] = useState(23.917754)
    const [lat, setLat] = useState(54.898871)
    const [zoom, setZoom] = useState(11)
    const [sensorId, setSensorId] = useState(false)
    const [allUsersDevices, SetallUsersDevices] = useState(false)
    const [directionsEnabled, setDirectionsEnabled] = useState(false)
    const {
        // allUsersDevices,
        getAllUsersDevices,
        toggleMapSidebar,
        user
    } = useAppContext()

    const [users, setUsers] = useState(getAllUsersDevices)
    const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

    const generateClearances = (devices) => {
        let clearances = {};
        clearances.type = 'FeatureCollection';
        clearances.features = [];
        Object.keys(devices).map(function (key) {
            let feature = {};
            // console.log(devices[key].at(0));
            feature.type = 'Feature';
            feature.geometry = {};
            feature.geometry.type = 'Point';
            feature.geometry.coordinates = [devices[key].at(0).longitude, devices[key].at(0).latitude];
            const id = devices[key].at(0).id_sensor;
            let properties = {
                id,
                name: "sensor"
            };
            feature.properties = properties;
            clearances.features.push(feature);
        })
        return clearances;
    }

    let counter = 0;
    const maxAttempts = 50;
    let emoji = '';
    let collision = '';
    let detail = '';
    const reports = document.getElementById('reports');

    function addCard(id, element, clear, detail) {
        const card = document.createElement('div');
        card.className = 'card';
        // Add the response to the individual report created above
        const heading = document.createElement('div');
        // Set the class type based on clear value
        heading.className =
            clear === true
                ? 'card-header route-found'
                : 'card-header obstacle-found';
        heading.innerHTML =
            id === 0
                ? `${emoji} The route ${collision}`
                : `${emoji} Route ${id} ${collision}`;

        const details = document.createElement('div');
        details.className = 'card-details';
        details.innerHTML = `This ${detail} obstacles.`;

        card.appendChild(heading);
        card.appendChild(details);
        element.insertBefore(card, element.firstChild);
    }

    function noRoutes(element) {
        const card = document.createElement('div');
        card.className = 'card';
        // Add the response to the individual report created above
        const heading = document.createElement('div');
        heading.className = 'card-header no-route';
        emoji = '🛑';
        heading.innerHTML = `${emoji} Ending search.`;

        // Add details to the individual report
        const details = document.createElement('div');
        details.className = 'card-details';
        details.innerHTML = `No clear route found in ${counter} tries.`;

        card.appendChild(heading);
        card.appendChild(details);
        element.insertBefore(card, element.firstChild);
    }

    useEffect(() => {
        users.then((value) => {

            if (map.current) return;
            SetallUsersDevices(value.allUsersDevices)
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/light-v10',
                center: [lng, lat],
                zoom: zoom
            })


            directions.current = new MapboxDirections({
                accessToken: mapboxgl.accessToken,
                unit: 'metric',
                profile: 'mapbox/walking',
                alternatives: 'false',
                geometries: 'geojson',
                interactive: true,
                // controls: {
                //     profileSwitcher: 'traffic'
                // }

            })

            Object.keys(value.allUsersDevices).map(function (key) {
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

            const newClearences = generateClearances(value.allUsersDevices);

            const obstacle = turf.buffer(newClearences, 0.05, { units: 'kilometers' })
            let bbox = [0, 0, 0, 0];
            let polygon = turf.bboxPolygon(bbox);

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

                map.current.addSource('theRoute', {
                    type: 'geojson',
                    data: {
                        type: 'Feature'
                    }
                });

                map.current.addLayer({
                    id: 'theRoute',
                    type: 'line',
                    source: 'theRoute',
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#cccccc',
                        'line-opacity': 0.5,
                        'line-width': 13,
                        'line-blur': 0.5
                    }
                });

                map.current.addSource('theBox', {
                    type: 'geojson',
                    data: {
                        type: 'Feature'
                    }
                });
                map.current.addLayer({
                    id: 'theBox',
                    type: 'fill',
                    source: 'theBox',
                    layout: {},
                    paint: {
                        'fill-color': '#FFC300',
                        'fill-opacity': 0.5,
                        'fill-outline-color': '#FFC300'
                    }
                });
            })

            map.current.on("click", "clearances", e => {
                if (e.features.length) {
                    const feature = e.features[0];
                    setSensorId(feature.properties.id)
                    toggleMapSidebar()
                }
            });



            directions.current.on('clear', () => {
                map.current.setLayoutProperty('theRoute', 'visibility', 'none');
                map.current.setLayoutProperty('theBox', 'visibility', 'none');

                counter = 0;
                // reports.innerHTML = '';
            });


            directions.current.on('route', (event) => {
                // Hide the route and box by setting the opacity to zero
                map.current.setLayoutProperty('theRoute', 'visibility', 'none');
                map.current.setLayoutProperty('theBox', 'visibility', 'none');
                if (counter >= maxAttempts) {
                    //   noRoutes(reports);
                    console.log("No routes ")
                } else {
                    // Make each route visible
                    for (const route of event.route) {
                        // Make each route visible
                        map.current.setLayoutProperty('theRoute', 'visibility', 'visible');
                        map.current.setLayoutProperty('theBox', 'visibility', 'visible');

                        // Get GeoJSON LineString feature of route
                        const routeLine = polyline.toGeoJSON(route.geometry);

                        // Create a bounding box around this route
                        // The app will find a random point in the new bbox
                        bbox = turf.bbox(routeLine);
                        polygon = turf.bboxPolygon(bbox);

                        // Update the data for the route
                        // This will update the route line on the map
                        map.current.getSource('theRoute').setData(routeLine);

                        // Update the box
                        map.current.getSource('theBox').setData(polygon);

                        const clear = turf.booleanDisjoint(obstacle, routeLine);

                        if (clear === true) {
                            collision = 'does not intersect any obstacles!';
                            detail = `takes ${(route.duration / 60).toFixed(
                                0
                            )} minutes and avoids`;
                            emoji = '✔️';
                            map.current.setPaintProperty('theRoute', 'line-color', '#74c476');
                            // Hide the box
                            map.current.setLayoutProperty('theBox', 'visibility', 'none');
                            // Reset the counter
                            counter = 0;
                        } else {
                            // Collision occurred, so increment the counter
                            counter = counter + 1;
                            // As the attempts increase, expand the search area
                            // by a factor of the attempt count
                            polygon = turf.transformScale(polygon, counter * 0.08);
                            bbox = turf.bbox(polygon);
                            collision = 'is bad.';
                            detail = `takes ${(route.duration / 60).toFixed(
                                0
                            )} minutes and hits`;
                            emoji = '⚠️';
                            map.current.setPaintProperty('theRoute', 'line-color', '#de2d26');

                            // Add a randomly selected waypoint to get a new route from the Directions API
                            const randomWaypoint = turf.randomPoint(1, { bbox: bbox });
                            directions.current.setWaypoint(
                                0,
                                randomWaypoint['features'][0].geometry.coordinates
                            );
                        }
                        // Add a new report section to the sidebar
                        // addCard(counter, reports, clear, detail);
                    }
                }
            });

        }); //after data
    }, [])

    function toggleDirections() {
        if (!map.current || !directions.current) return;

        if (directionsEnabled) {
            map.current.removeControl(directions.current);
            setDirectionsEnabled(false);
        } else {
            setDirectionsEnabled(true);
            map.current.addControl(directions.current, 'top-left');
        }


    }
    return (
        <>
            < Menu />
            {sensorId ? <MapSidebar data={allUsersDevices[sensorId]} /> : ''}
            <MapWrapper >
                <div>

                    <div className="sidebar">
                        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                    </div>
                    <button className='btn enable-map-click' onClick={() => toggleDirections()}>
                        {directionsEnabled ? 'disable points on map' : 'set points on map'}
                    </button>
                    <div ref={mapContainer} className="map-container">
                    </div>
                </div>
            </MapWrapper>
        </>
    )
}

export default Map