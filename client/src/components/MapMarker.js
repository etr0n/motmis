import { Marker, Popup } from "react-leaflet"
import { useEffect } from 'react';
import { useAppContext } from "../context/appContext";
import { useState } from 'react';

const MapMarker = ({ latitude, longitude, name, id_sensor }) => {

    //const [state, setState] = useState(false)

    const {
        getAllUsersDevicesData,
        allUsersDevicesData,
        setAllUsersDevicesData,

    } = useAppContext()


    const handlerChange = () => {

        setAllUsersDevicesData(id_sensor)
        getAllUsersDevicesData()
        //setState(true)

    }
    useEffect(() => {
        getAllUsersDevicesData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
        //setAllUsersDevicesData(id_sensor)
        //getAllUsersDevicesData()
    }, [])

    // if (state) {
    //     return (
    //         <>
    //             <Marker position={[latitude, longitude]}>
    //                 {console.log(allUsersDevicesData)}

    //             </Marker>
    //         </>
    //     )

    // }

    return (
        <>
            <Marker position={[latitude, longitude]} eventHandlers={{ click: () => { handlerChange() } }}>
                {allUsersDevicesData.map((device) => {
                    return (
                        <Popup key={device.id_measurement}>
                            {device.name ? device.name : "-"} <br />
                            {device.id_sensor ? device.id_sensor : "-"}
                        </Popup>
                    )
                })}
            </Marker>
        </>
    )
}

export default MapMarker