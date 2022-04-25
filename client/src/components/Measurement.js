import moment from 'moment'
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAppContext } from "../context/appContext";
import { useState, useEffect } from 'react';
import Wrapper from '../assets/wrappers/DeviceList'

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
        fontFamily: `'Cabin', 'Sans-Serif'`,
    }
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    }
}));
const Measurement = ({
    id_measurement: id,
    no2,
    o3,
    so2,
    co,
    temperature,
    humidity,
    pressure,
    pm25,
    pm10,
    time,
}) => {
    const { deleteDeviceData } = useAppContext()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let date = moment(time)
    let formattedTime = moment(time)
    date = date.format("MMM, Do, YYYY")
    formattedTime = formattedTime.format("H:mm:ss  ")
    return (
        <StyledTableRow>
            <StyledTableCell>{no2 ? no2 : '-'}</StyledTableCell>
            <StyledTableCell>{o3 ? o3 : '-'}</StyledTableCell>
            <StyledTableCell>{so2 ? so2 : '-'}</StyledTableCell>
            <StyledTableCell>{co ? co : '-'}</StyledTableCell>
            <StyledTableCell>{temperature ? temperature : '-'}</StyledTableCell>
            <StyledTableCell>{humidity ? humidity : '-'}</StyledTableCell>
            <StyledTableCell>{pressure ? pressure : '-'}</StyledTableCell>
            <StyledTableCell>{pm25 ? pm25 : '-'}</StyledTableCell>
            <StyledTableCell>{pm10 ? pm10 : '-'}</StyledTableCell>
            <StyledTableCell>{formattedTime}{date}</StyledTableCell>
            <StyledTableCell>
                <button type='button' className='btn delete-btn' onClick={handleOpen}>
                    Delete
                </button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} >
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            delete device
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            You're going to delete the measurement "{id}". Are you sure?
                        </Typography>
                        <Wrapper>
                            <Grid container>
                                <Grid item md={6}>
                                    <button type='button' className='btn delete-btn' onClick={() => deleteDeviceData(id)}>
                                        Yes, Delete!
                                    </button>
                                </Grid>
                                <Grid item md={6}>
                                    <button type='button' className='btn' onClick={handleClose}>
                                        No, Keep it.
                                    </button>
                                </Grid>
                            </Grid>
                        </Wrapper>
                    </Box>
                </Modal>
            </StyledTableCell>
        </StyledTableRow >
    )
}

export default Measurement