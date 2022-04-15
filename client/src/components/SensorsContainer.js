import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Device from "./Device";
import Wrapper from "../assets/wrappers/SensorsContainer";
import PageBtnContainer from "./PageBtnContainer";
import TableWrapper from "../assets/wrappers/DeviceList";
import Table from "react-bootstrap/Table"
import { Link } from "react-router-dom";

const SensorsContainer = () => {
    const {
        getSensors,
        sensors,
        isLoading,
        page,
        totalSensors,
        searchName,
        searchStatus,
        sort,
        numOfPages,
    } = useAppContext()

    //once the job component renders
    useEffect(() => {
        getSensors()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, searchName, searchStatus, sort])

    if (isLoading) {
        return <Loading center />
    }

    if (sensors.length === 0) {
        return <Wrapper>
            <h2>No sensors to display...</h2>
        </Wrapper>
    }

    return (
        <Wrapper>
            <div className="sensors-info btn-container">
                <h5>{totalSensors} sensor{sensors.length > 1 && 's'} found</h5>
                <Link
                    to="/add-device"
                    className='btn edit-btn'
                // onClick={() => setEditDevice(id)}
                >
                    Add device
                </Link>
            </div>

            <TableWrapper>
                <Table responsive className="styled-table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Model</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sensors.map((sensor) => {
                            return <Device key={sensor.id_sensor}{...sensor} />
                        })}
                    </tbody>
                </Table>
            </TableWrapper>

            {/*pagination*/}
            {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>

    )
}

export default SensorsContainer