import Wrapper from "../../../assets/wrappers/MeasurementContainer"
import { useAppContext } from "../../../context/appContext";
import { useEffect } from "react";
import { Loading, Measurement } from "../../../components";
import TableWrapper from "../../../assets/wrappers/DeviceList";
import PageBtnContainer from "../../../components/PageBtnContainer";
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
import SearchContainerDeviceDetails from '../../../components/SearchContainerDeviceDetails'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#199b14',
        color: theme.palette.common.white,
        fontSize: 16,
        fontFamily: `'Cabin', 'Sans-Serif'`,
    },
}));
const AllData = () => {
    const {
        allMeasurements: measurements,
        isLoading,
        page,
        totalMeasurements,
        sort,
        numOfPages,
        detailsDeviceId,
        getAllDeviceData,
    } = useAppContext()

    useEffect(() => {
        getAllDeviceData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, sort])

    if (isLoading) {
        return <Loading center />
    }

    if (measurements.length === 0) {
        return <Wrapper>
            <Grid container >
                <Grid item xs={6} md={6}>
                    <h4>No measurements to display...</h4>
                </Grid>
                <Grid item xs={6} md={6}>
                    <Box display="flex" justifyContent="flex-end">
                        <Link
                            to={`/add-device-data/${detailsDeviceId}`}
                            className='btn '
                        >
                            Add data
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Wrapper>
    }
    return (
        <>
            <SearchContainerDeviceDetails />
            <Wrapper>
                <Grid container >
                    <Grid item xs={6} md={6}>
                        <h5>{totalMeasurements} measurement{measurements.length > 1 && 's'} found</h5>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Box display="flex" justifyContent="flex-end">
                            <Link
                                to={`/add-device-data/${detailsDeviceId}`}
                                className='btn '
                            >
                                Add data
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
                <TableWrapper>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>NO2</StyledTableCell>
                                    <StyledTableCell>O3</StyledTableCell>
                                    <StyledTableCell>SO2</StyledTableCell>
                                    <StyledTableCell>CO</StyledTableCell>
                                    <StyledTableCell>Temperature</StyledTableCell>
                                    <StyledTableCell>Humidity</StyledTableCell>
                                    <StyledTableCell>Pressure</StyledTableCell>
                                    <StyledTableCell>PM 2.5</StyledTableCell>
                                    <StyledTableCell>PM 10</StyledTableCell>
                                    <StyledTableCell>Timestamp</StyledTableCell>
                                    <StyledTableCell>Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {measurements.map((measurement) => {
                                    return <Measurement key={measurement.id_measurement}{...measurement} />

                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TableWrapper>
                {numOfPages > 1 && <PageBtnContainer />}
            </Wrapper>
        </>
    )
}

export default AllData