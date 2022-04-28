import Menu from "../components/Menu"
import { MapContainer, TileLayer } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import { useEffect } from 'react';
import { useAppContext } from "../context/appContext";
import MapMarker from './../components/MapMarker';

// delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Map = () => {

    const { allUsersDevices, getAllUsersDevices } = useAppContext()

    useEffect(() => { //when component loads 
        getAllUsersDevices()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <Menu />
            <MapContainer center={[55.606028440387156, 23.95855713856371]} zoom={7} scrollWheelZoom={true} className='leaflet-container'>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {allUsersDevices.map((sensor) => {
                    console.log(sensor);
                    return <MapMarker key={sensor.id_sensor}{...sensor} />
                })}
            </MapContainer>
        </>
    )
}

export default Map