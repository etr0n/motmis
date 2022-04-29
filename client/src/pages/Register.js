import { useState, useEffect } from 'react'
import { Logo, FormRow, Alert } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
import Menu from './../components/Menu'

const initialState = {
    name: '',
    lastName: '',
    location: '',
    email: '',
    password: '',
}

const Register = () => {
    const [values, setValues] = useState(initialState)
    const navigate = useNavigate()
    const { user, isLoading, showAlert, displayAlert, registerUser, loginUser, isMember, toggleIsMember } = useAppContext()

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const { name, email, password, lastName, location } = values
        if (!email || !password || (!isMember && !name && !lastName && !location)) {
            displayAlert()
            return
        }
        const currentUser = { name, email, password, lastName, location }
        if (isMember) {
            loginUser(currentUser)
        }
        else {
            registerUser(currentUser)
        }
    }

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/')
            }, 3000);
        }
    }, [user, navigate]) //invoking on initial render and every time user or navigate changes


    const toggleMember = () => {
        setValues({ ...values })
        toggleIsMember(!isMember)
    }
    return (
        <>
            <Menu />
            <Wrapper className='full-page'>
                <form className='form' onSubmit={onSubmit}>
                    <Logo />
                    <h3>{isMember ? "Login" : "Register"}</h3>
                    {showAlert && <Alert />}
                    {!isMember && (
                        < FormRow
                            type='text'
                            name='name'
                            values={values.name}
                            handleChange={handleChange} />
                    )}
                    {!isMember && (
                        < FormRow
                            labelText='Last Name'
                            type='text'
                            name='lastName'
                            values={values.lastName}
                            handleChange={handleChange} />
                    )}
                    {!isMember && (
                        < FormRow
                            labelText='Country'
                            type='text'
                            name='location'
                            values={values.location}
                            handleChange={handleChange} />
                    )}
                    {/* email input */}
                    <FormRow
                        type='email'
                        name='email'
                        values={values.email}
                        handleChange={handleChange} />
                    {/* password input */}
                    <FormRow
                        type='password'
                        name='password'
                        values={values.password}
                        handleChange={handleChange} />

                    {/* <button type='submit' className='btn btn-block' disabled={isLoading}> */}
                    <button type='submit' className='btn btn-block' >
                        Submit
                    </button>
                    <p>
                        {isMember ? 'Not a member yet?' : 'Already a member?'}
                        <button type='button' onClick={toggleMember} className='member-btn'>
                            {!isMember ? "Login" : "Register"}
                        </button>
                    </p>
                </form>
            </Wrapper>
        </>
    )
}

export default Register