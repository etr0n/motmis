import { FormRow, Alert, FormRowSelect } from "../../../components"
import { useAppContext } from "../../../context/appContext"
import Wrapper from "../../../assets/wrappers/DashboardFormPage"
import { Link } from "react-router-dom"
import Grid from '@mui/material/Grid';
import { useEffect } from "react";

const AddDeviceData = () => {

    const {
        isLoading,
        showAlert,
        displayAlert,
        no2,
        o3,
        so2,
        co,
        temperature,
        humidity,
        pressure,
        pm25,
        pm10,
        handleChange,
        clearValues,
        createDeviceData,
        detailsDeviceId,
    } = useAppContext()

    useEffect(() => {
        clearValues()
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        // if (!name || !model || !latitude || !longitude) {
        //     displayAlert()
        //     return
        // }
        createDeviceData()

    }
    const handleDeviceInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        handleChange({ name, value })
    }

    return (

        < Wrapper >
            <Link to={`/details-device/${detailsDeviceId}`}
                className='btn back'
            >
                Back
            </Link>
            <form className="form">
                <h3>add device data</h3>
                {showAlert && <Alert />}
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <FormRow
                            type='number'
                            name="no2"
                            value={no2}
                            handleChange={handleDeviceInput}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormRow
                            type='text'
                            name="o3"
                            value={o3}
                            handleChange={handleDeviceInput}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormRow
                            type='text'
                            name="so2"
                            value={so2}
                            handleChange={handleDeviceInput}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormRow
                            type='text'
                            name="co"
                            value={co}
                            handleChange={handleDeviceInput}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormRow
                            type='text'
                            name="temperature"
                            value={temperature}
                            handleChange={handleDeviceInput}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormRow
                            type='text'
                            name="humidity"
                            value={humidity}
                            handleChange={handleDeviceInput}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormRow
                            type='text'
                            name="pressure"
                            value={pressure}
                            handleChange={handleDeviceInput}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormRow
                            type='text'
                            labelText="PM 2.5"
                            name="pm25"
                            value={pm25}
                            handleChange={handleDeviceInput}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormRow
                            type='text'
                            labelText="PM 10"
                            name="pm10"
                            value={pm10}
                            handleChange={handleDeviceInput}
                        />
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
        </ Wrapper>
    )
}

export default AddDeviceData