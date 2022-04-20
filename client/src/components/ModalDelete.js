import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from 'react'
import { useAppContext } from "../context/appContext";

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

const ModalDelete = () => {
    const { showModal } = useAppContext()

    // const handleOpen = () => showModal(true)
    // const handleClose = () => showModal(false);
    return (
        <>
            <Modal
                open={showModal}
                onClose={!showModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Delete Device
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        You're going to delete the device name . Are you sure?
                    </Typography>
                    <Button>Yes, Delete!</Button>
                    <Button onClick={!showModal}>No, Keep it.</Button>
                </Box>
            </Modal></>
    )
}

export default ModalDelete