import { useState } from "react";
import { FormRow, Alert } from "../../../components";
import { useAppContext } from "../../../context/appContext";
import Wrapper from "../../../assets/wrappers/DashboardFormPage";
import Grid from '@mui/material/Grid';


const Profile = () => {
    const { user, showAlert, displayAlert, updateUser, isLoading } = useAppContext()

    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)
    const [lastName, setLastName] = useState(user?.lastName)
    const [location, setLocation] = useState(user?.location)

    const handleSubmit = (e) => {
        e.preventDefault()
        //remove while testing
        if (!name || !email || !lastName || !location) {
            displayAlert()
            return
        }
        updateUser({ name, email, lastName, location })
    }
    return (
        <Wrapper>
            <form className="form" onSubmit={handleSubmit}>
                <h3>profile</h3>
                {showAlert && <Alert />} {/*if it is true then alert component will show*/}
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <FormRow
                            type="text"
                            name="name"
                            value={name}
                            handleChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormRow
                            labelText="last name"
                            type="text"
                            name="lastName"
                            value={lastName}
                            handleChange={(e) => setLastName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {/* <FormRow
                            type="email"
                            name="email"
                            value={email}
                            handleChange={(e) => setEmail(e.target.value)}
                            true
                        /> */}
                        <div className="form-row">
                            <label htmlFor="email" className='form-label'>
                                email
                            </label>
                            <input
                                type="email"
                                value={email}
                                name="email"
                                className='form-input'
                                disabled />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormRow
                            labelText='Country'
                            type="text"
                            name="location"
                            value={location}
                            handleChange={(e) => setLocation(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <button className="btn btn-block" type="submit" disabled={isLoading}>
                            {isLoading ? 'Please wait...' : 'save changes'}
                        </button>
                    </Grid>
                </Grid>
            </form>
        </Wrapper >
    )
}

export default Profile