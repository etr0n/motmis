import Wrapper from '../../src/assets/wrappers/MapSidebar'
import { useAppContext } from "../context/appContext";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableWrapper from "../../src/assets/wrappers/DeviceList";
import moment from 'moment'

const MapSidebar = () => {
    const { showMapSidebar, toggleMapSidebar, allUsersDevices, deviceMarkerId } = useAppContext()

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#199b14',
            color: theme.palette.common.white,
            fontSize: 16,
            fontFamily: `'Cabin', 'Sans-Serif'`,
        },
    }));
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        // hide last border
        "&:last-child td, &:last-child th": {
            border: 0,
        }
    }));
    return (
        <Wrapper>
            <div className={showMapSidebar ? "sidebar" : "sidebar hidden"}>
                <div className="container">
                    <div className="closeBtn">
                        <button className='btn btn-hero' onClick={toggleMapSidebar}>close</button>
                        <br />
                    </div>
                    {Object.keys(allUsersDevices).map(function (key) {
                        let date, formattedTime
                        if (allUsersDevices[key].at(0).time !== null) {
                            date = moment(allUsersDevices[key].at(0).time)
                            formattedTime = moment(allUsersDevices[key].at(0).time)
                            date = date.format("MMMM Do YYYY,")
                            formattedTime = formattedTime.format("H:mm:ss  ")
                        }
                        else {
                            date = '-'
                            formattedTime = ''
                        }

                        if (key == deviceMarkerId) {
                            return (
                                <h4 key={key}>
                                    Device ID: {allUsersDevices[key].at(0).id_sensor ? allUsersDevices[key].at(0).id_sensor : '-'}
                                    <br />
                                    Last updated: {date} {formattedTime}
                                </h4>

                            )
                        }
                    })}
                    <TableWrapper>
                        <Table sx={{ minWidth: 100 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>PM 2.5</StyledTableCell>
                                    <StyledTableCell>PM 10</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.keys(allUsersDevices).map(function (key) {
                                    if (key == deviceMarkerId) {
                                        return (
                                            <StyledTableRow key={key}>
                                                <StyledTableCell>{allUsersDevices[key].at(0).pm25 ? allUsersDevices[key].at(0).pm25 : '-'}</StyledTableCell>
                                                <StyledTableCell>{allUsersDevices[key].at(0).pm10 ? allUsersDevices[key].at(0).pm10 : '-'}</StyledTableCell>
                                            </StyledTableRow >

                                        )
                                    }
                                })}
                            </TableBody>
                        </Table>

                        <Table sx={{ minWidth: 100 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>NO2</StyledTableCell>
                                    <StyledTableCell>O3</StyledTableCell>
                                    <StyledTableCell>SO2</StyledTableCell>
                                    <StyledTableCell>CO</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.keys(allUsersDevices).map(function (key) {
                                    if (key == deviceMarkerId) {
                                        return (
                                            <StyledTableRow key={key}>
                                                <StyledTableCell>{allUsersDevices[key].at(0).no2 ? allUsersDevices[key].at(0).no2 : '-'}</StyledTableCell>
                                                <StyledTableCell>{allUsersDevices[key].at(0).o3 ? allUsersDevices[key].at(0).o3 : '-'}</StyledTableCell>
                                                <StyledTableCell>{allUsersDevices[key].at(0).so2 ? allUsersDevices[key].at(0).so2 : '-'}</StyledTableCell>
                                                <StyledTableCell>{allUsersDevices[key].at(0).co ? allUsersDevices[key].at(0).co : '-'}</StyledTableCell>
                                            </StyledTableRow >
                                        )
                                    }
                                })}
                            </TableBody>
                        </Table>

                        <Table sx={{ minWidth: 100 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Temperature</StyledTableCell>
                                    <StyledTableCell>Humidity</StyledTableCell>
                                    <StyledTableCell>Pressure</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.keys(allUsersDevices).map(function (key) {
                                    if (key == deviceMarkerId) {
                                        return (
                                            <StyledTableRow key={key}>
                                                <StyledTableCell>{allUsersDevices[key].at(0).temperature ? allUsersDevices[key].at(0).temperature : '-'}</StyledTableCell>
                                                <StyledTableCell>{allUsersDevices[key].at(0).humidity ? allUsersDevices[key].at(0).humidity : '-'}</StyledTableCell>
                                                <StyledTableCell>{allUsersDevices[key].at(0).pressure ? allUsersDevices[key].at(0).pressure : '-'}</StyledTableCell>
                                            </StyledTableRow >
                                        )
                                    }
                                })}
                            </TableBody>
                        </Table>
                    </TableWrapper>
                </div>
            </div>
        </Wrapper >
    )

}

export default MapSidebar