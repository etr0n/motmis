import { Marker, Popup } from "react-leaflet"
import { useEffect } from 'react';
import { useAppContext } from "../context/appContext";

const MapMarker = ({ latitude, longitude, name, id_sensor }) => {
    const {
        getAllUsersDevicesData,
        allUsersDevicesData
    } = useAppContext()

    useEffect(() => { //when component loads 
        getAllUsersDevicesData(id_sensor)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <Marker position={[latitude, longitude]} >
                <Popup>
                    {name}
                </Popup>
            </Marker>
        </>
    )
}

export default MapMarker