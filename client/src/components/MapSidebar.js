import Wrapper from '../assets/wrappers/MapSidebar'
import { useAppContext } from "../context/appContext";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableWrapper from "../assets/wrappers/DeviceList";
import moment from 'moment'
import Alert from './Alert'

const MapSidebar = (device) => {
    const { showMapSidebar, toggleMapSidebar, createSubscription, showAlert } = useAppContext()

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

    const formatDate = () => {
        let date
        if (device.data.at(0).time !== null) {
            date = moment(device.data.at(0).time)
            date = date.format("MMMM Do YYYY,")
            return date

        }
        else {
            date = '-'
            return date
        }
    }

    const formatTime = () => {
        let formattedTime
        if (device.data.at(0).time !== null) {
            formattedTime = moment(device.data.at(0).time)
            formattedTime = formattedTime.format("H:mm:ss  ")
            return formattedTime
        }
        else {
            formattedTime = ''
            return formattedTime
        }
    }

    return (
        <Wrapper>
            <div className={showMapSidebar ? "sidebar" : "sidebar hidden"}>
                <div className="container">
                    <div className="closeBtn-container">
                        {showAlert && <Alert />}
                        <button className='btn btn-hero' onClick={toggleMapSidebar}>close</button>
                        <button className='btn btn-hero' onClick={() => createSubscription(device.data.at(0).id_sensor, device.data.at(0).name, device.data.at(0).latitude, device.data.at(0).longitude)}>subscribe</button>
                    </div>
                    <h4 >
                        Device name: {device.data.at(0).name ? device.data.at(0).name : '-'}
                        <br />
                        Device ID: {device.data.at(0).id_sensor ? device.data.at(0).id_sensor : '-'}
                        <br />
                        Last updated: {formatDate()}{formatTime()}
                    </h4>
                    <TableWrapper>
                        <Table sx={{ minWidth: 100 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>PM 2.5</StyledTableCell>
                                    <StyledTableCell>PM 10</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow >
                                    <StyledTableCell>{device.data.at(0).pm25 ? device.data.at(0).pm25 + ' µg/m³' : '-'}</StyledTableCell>
                                    <StyledTableCell>{device.data.at(0).pm10 ? device.data.at(0).pm10 + ' µg/m³' : '-'}</StyledTableCell>
                                </StyledTableRow >
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
                                <StyledTableRow>
                                    <StyledTableCell>{device.data.at(0).no2 ? device.data.at(0).no2 + ' μg/m³' : '-'}</StyledTableCell>
                                    <StyledTableCell>{device.data.at(0).o3 ? device.data.at(0).o3 + ' μg/m³' : '-'}</StyledTableCell>
                                    <StyledTableCell>{device.data.at(0).so2 ? device.data.at(0).so2 + ' μg/m³' : '-'}</StyledTableCell>
                                    <StyledTableCell>{device.data.at(0).co ? device.data.at(0).co + ' mg/m³' : '-'}</StyledTableCell>
                                </StyledTableRow >
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
                                <StyledTableRow>
                                    <StyledTableCell>{device.data.at(0).temperature ? device.data.at(0).temperature + ' °C' : '-'}</StyledTableCell>
                                    <StyledTableCell>{device.data.at(0).humidity ? device.data.at(0).humidity + ' %' : '-'}</StyledTableCell>
                                    <StyledTableCell>{device.data.at(0).pressure ? device.data.at(0).pressure + ' hPa' : '-'}</StyledTableCell>
                                </StyledTableRow >
                            </TableBody>
                        </Table>
                    </TableWrapper>
                    <h4 >
                        GRAPH HERE
                    </h4>
                </div>
            </div>
        </Wrapper >
    )
}

export default MapSidebar