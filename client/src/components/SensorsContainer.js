import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Device from "./Device";
import Wrapper from "../assets/wrappers/SensorsContainer";
import PageBtnContainer from "./PageBtnContainer";
import TableWrapper from "../assets/wrappers/DeviceList";
import Grid from '@mui/material/Grid';
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#199b14',
        color: theme.palette.common.white,
        fontSize: 16,
        fontFamily: `'Cabin', 'Sans-Serif'`,
    },
}));

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
        setPageNumber,
    } = useAppContext()

    useEffect(() => {
        getSensors()
        setPageNumber()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, searchName, searchStatus, sort])

    if (isLoading) {
        return <Loading center />
    }

    if (sensors.length === 0) {
        return <Wrapper>
            <Grid container >
                <Grid item xs={6} md={6}>
                    <h4>No devices to display...</h4>
                </Grid>
                <Grid item xs={6} md={6}>
                    <Box display="flex" justifyContent="flex-end">
                        <Link
                            to="/add-device"
                            className='btn '
                        >
                            Add device
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Wrapper>
    }

    return (
        <Wrapper>
            <Grid container >
                <Grid item xs={6} md={6}>
                    <h5>{totalSensors} sensor{sensors.length > 1 && 's'} found</h5>
                </Grid>
                <Grid item xs={6} md={6}>
                    <Box display="flex" justifyContent="flex-end">
                        <Link
                            to="/add-device"
                            className='btn '
                        >
                            Add device
                        </Link>
                    </Box>
                </Grid>
            </Grid>
            <TableWrapper>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Model</StyledTableCell>
                                <StyledTableCell>Status</StyledTableCell>
                                <StyledTableCell>Date</StyledTableCell>
                                <StyledTableCell>Location</StyledTableCell>
                                <StyledTableCell>Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sensors.map((sensor) => {
                                return <Device key={sensor.id_sensor} {...sensor} />
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TableWrapper>
            {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>

    )
}

export default SensorsContainer