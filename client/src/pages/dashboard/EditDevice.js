import { FormRow, Alert, FormRowSelect } from "../../components"
import { useAppContext } from "../../context/appContext"
import Wrapper from "../../assets/wrappers/DashboardFormPage"
import { Link } from "react-router-dom"
import Grid from '@mui/material/Grid';

const EditDevice = () => {
    const {
        isLoading,
        isEditing,
        showAlert,
        displayAlert,
        name,
        model,
        latitude,
        longitude,
        status,
        statusOptions,
        handleChange,
        clearValues,
        createDevice,
        editDevice,
    } = useAppContext()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name || !model || !latitude || !longitude) {
            displayAlert()
            return
        }
        editDevice()
    }
    const handleDeviceInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        handleChange({ name, value })
    }

    return (
        <Wrapper>
            <Link to="/"
                className='btn back'
            >
                Back
            </Link>
            <form className="form">
                <h3>edit device</h3>
                {showAlert && <Alert />}
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <FormRow
                            type='text'
                            name="name"
                            value={name}
                            handleChange={handleDeviceInput}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormRow
                            type='text'
                            name="model"
                            value={model}
                            handleChange={handleDeviceInput}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormRow
                            type='text'
                            //labelText="Job location"
                            name="latitude"
                            value={latitude}
                            handleChange={handleDeviceInput}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormRow
                            type='text'
                            //labelText="Job location"
                            name="longitude"
                            value={longitude}
                            handleChange={handleDeviceInput}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormRowSelect
                            name="status"
                            value={status}
                            handleChange={handleDeviceInput}
                            list={statusOptions} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <button
                            type='submit'
                            className="btn btn-block submit-btn"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            submit
                        </button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <button
                            className="btn btn-block clear-btn"
                            onClick={(e) => {
                                e.preventDefault()
                                clearValues()
                            }}
                        >
                            clear
                        </button>
                    </Grid>
                </Grid>
            </form>
        </Wrapper >
    )
}

export default EditDevice