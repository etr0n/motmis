import { FormRow, Alert, FormRowSelect } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { Link } from "react-router-dom";

const AddDevice = () => {
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
        editJob,
    } = useAppContext()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name || !model || !latitude || !longitude) {
            displayAlert()
            return
        }
        if (isEditing) {
            editJob()
            return
        }
        createDevice()
    }
    const handleDeviceInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        handleChange({ name, value })
    }

    return (
        <Wrapper>
            <Link to="/"
                className='btn edit-btn'>
                Back
            </Link>
            <form className="form">
                <h3>{isEditing ? 'edit device' : 'add device'}</h3>
                {showAlert && <Alert />}
                <div className="form-center">
                    <FormRow
                        type='text'
                        name="name"
                        value={name}
                        handleChange={handleDeviceInput}
                    />
                    <FormRow
                        type='text'
                        name="model"
                        value={model}
                        handleChange={handleDeviceInput}
                    />
                    <FormRow
                        type='text'
                        //labelText="Job location"
                        name="latitude"
                        value={latitude}
                        handleChange={handleDeviceInput}
                    />
                    <FormRow
                        type='text'
                        //labelText="Job location"
                        name="longitude"
                        value={longitude}
                        handleChange={handleDeviceInput}
                    />
                    {/*job type and job status*/}
                    <FormRowSelect
                        name="status"
                        value={status}
                        handleChange={handleDeviceInput}
                        list={statusOptions} />
                    <div className="btn-container">
                        <button
                            type='submit'
                            className="btn btn-block submit-btn"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            submit
                        </button>
                        <button
                            className="btn btn-block clear-btn"
                            onClick={(e) => {
                                e.preventDefault()
                                clearValues()
                            }}
                        >
                            clear
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper >
    )
}

export default AddDevice