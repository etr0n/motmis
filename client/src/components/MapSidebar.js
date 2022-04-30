import Wrapper from '../../src/assets/wrappers/MapSidebar'
import { useAppContext } from "../context/appContext";

const MapSidebar = () => {
    const { showMapSidebar, toggleMapSidebar, allUsersDevices, deviceMarkerId } = useAppContext()
    return (
        <Wrapper>
            <div className={showMapSidebar ? "sidebar" : "sidebar hidden"}>
                <div className="container">
                    <div className="closeBtn">
                        <button className='btn btn-hero' onClick={toggleMapSidebar}>close</button>
                        <br />
                    </div>
                    {Object.keys(allUsersDevices).map(function (key) {
                        if (key == deviceMarkerId) {
                            return (
                                <h1 key={key}>
                                    {allUsersDevices[key].at(0).id_sensor ? allUsersDevices[key].at(0).id_sensor : '-'}
                                </h1>
                            )
                        }
                    })}
                    {/* <span># {this.props.lang.selectedSensors}: {count}</span> */}
                    {/* <InfoTable type="partsPerMillion" data={sensors.partsPerMillion} />
                <InfoTable type="tempAndHum" data={sensors.tempAndHum} /> */}
                </div>
            </div>
        </Wrapper >
    )

}

export default MapSidebar