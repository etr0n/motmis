import Wrapper from "../../../assets/wrappers/MeasurementContainer"
import { useAppContext } from "../../../context/appContext";
import { useEffect } from "react";
import { Loading, Subscription } from "../../../components";
import TableWrapper from "../../../assets/wrappers/DeviceList";
import PageBtnContainer from "../../../components/PageBtnContainer";
import Grid from '@mui/material/Grid';
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchContainerSubscriptions from '../../../components/SearchContainerSubscriptions'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#199b14',
        color: theme.palette.common.white,
        fontSize: 16,
        fontFamily: `'Cabin', 'Sans-Serif'`,
    },
}));

const Subscriptions = () => {
    const {
        allSubscriptions: subscriptions,
        isLoading,
        page,
        totalSubscriptions,
        sortSubscription,
        numOfPages,
        getAllSubscriptions
    } = useAppContext()

    useEffect(() => {
        getAllSubscriptions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, sortSubscription])

    if (isLoading) {
        return <Loading center />
    }

    if (subscriptions.length === 0) {
        return <Wrapper>
            <Grid container >
                <Grid item xs={6} md={6}>
                    <h4>No subscriptions to display...</h4>
                </Grid>
            </Grid>
        </Wrapper>
    }
    return (
        <>
            <SearchContainerSubscriptions />
            <Wrapper>
                <Grid container >
                    <Grid item xs={6} md={6}>
                        <h5>{totalSubscriptions} subscription{subscriptions.length > 1 && 's'} found</h5>
                    </Grid>
                </Grid>
                <TableWrapper>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell>Latitude</StyledTableCell>
                                    <StyledTableCell>Longitude</StyledTableCell>
                                    <StyledTableCell>Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {subscriptions.map((subscription) => {
                                    return <Subscription key={subscription.id_subscription}{...subscription} />

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

export default Subscriptions