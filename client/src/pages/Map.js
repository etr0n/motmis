import Menu from "../components/Menu"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet"
//import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import { useEffect } from 'react';
import { useAppContext } from "../context/appContext";
import { useState } from 'react';
import Wrapper from '../../src/assets/wrappers/MapLayout'
import MapSidebar from './../components/MapSidebar';

// delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Map = () => {

    const { allUsersDevices, getAllUsersDevices, allUsersDevicesData, getAllUsersDevicesData, setAllUsersDevicesData, toggleMapSidebar
    } = useAppContext()
    const [marker, setMarker] = useState()

    useEffect(() => { //when component loads 
        getAllUsersDevices()
        getAllUsersDevicesData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Wrapper>
            <main className="dashboard">
                <MapSidebar />
                <div >
                    <Menu />
                    <div className="dashboard-page">
                        <MapContainer center={[55.606028440387156, 23.95855713856371]} zoom={7} minZoom={3} maxZoom={17} scrollWheelZoom={true}  >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {/* {allUsersDevices.map((sensor) => {
                    //console.log(sensor);
                    return <MapMarker key={sensor.id_sensor}{...sensor} />
                })} */}
                            {Object.keys(allUsersDevices).map(function (key) {
                                return (
                                    <Marker key={key} position={[allUsersDevices[key].at(0).latitude, allUsersDevices[key].at(0).longitude]} eventHandlers={{ click: () => { setMarker(key); toggleMapSidebar() } }}  >
                                        {
                                            Object.keys(allUsersDevices).map(function (key) {
                                                // console.log('key', key);
                                                console.log('marker', marker)
                                                if (key === marker) {
                                                    return (
                                                        <Popup key={key}>
                                                            {allUsersDevices[key].at(0).temperature ? allUsersDevices[key].at(0).temperature : '-'}
                                                            {
                                                                allUsersDevices[key].map((item) => {
                                                                    return (
                                                                        <Popup>
                                                                            {item.temperature}
                                                                        </Popup>
                                                                    )
                                                                })}
                                                        </Popup>
                                                    )

                                                }
                                            })
                                        }
                                    </Marker>
                                )
                            })}
                        </MapContainer>
                    </div>
                </div>
            </main>
        </Wrapper>
    )
}

export default Map