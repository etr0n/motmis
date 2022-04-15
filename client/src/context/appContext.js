import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_JOB_BEGIN,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,
    GET_JOBS_BEGIN,
    GET_JOBS_SUCCESS,
    SET_EDIT_JOB,
    DELETE_JOB_BEGIN,
    EDIT_JOB_BEGIN,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_ERROR,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    CLEAR_FILTERS,
    CHANGE_PAGE,
} from './actions'
import axios from "axios"


const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: userLocation || '',
    showSidebar: false,
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobLocation: userLocation || '',
    jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
    jobType: 'full-time',
    statusOptions: ["active", "offline"],
    status: 'pending',
    sensors: [],
    totalSensors: 0,
    numOfPages: 1,
    page: 1,
    stats: {}, //returning object from server
    monthlyApplications: [],
    searchName: '',
    searchStatus: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    //axios
    const authFetch = axios.create({
        baseURL: '/api/v1',
    })

    authFetch.interceptors.request.use((config) => {
        config.headers.common['Authorization'] = `Bearer ${state.token}`
        return config
    }, (err) => {
        return Promise.reject(err)
    })

    authFetch.interceptors.response.use((response) => {
        return response
    }, (err) => {
        console.log(err.response);
        if (err.response.status === 401) {
            logoutUser()
        }
        return Promise.reject(err)
    })


    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }
    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 3000)
    }

    const addUserToLocalStorage = ({ user, token, location }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.setItem('location', location)
    }
    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('location')
    }

    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })
        try {
            const response = await axios.post('/api/v1/auth/register', currentUser)
            //console.log(response);
            const { user, token, location } = response.data
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: { user, token, location }
            })
            //local storage later
            addUserToLocalStorage({ user, token, location })
        } catch (error) {
            //console.log(error.response);
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: { msg: error.response.data.msg }
            })
        }
        clearAlert()
    }

    const loginUser = async (currentUser) => { //going to be fetch request
        dispatch({ type: LOGIN_USER_BEGIN })
        try {
            const { data } = await axios.post('/api/v1/auth/login', currentUser)
            //console.log(response);
            const { user, token, location } = data
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: { user, token, location }
            })
            //local storage later
            addUserToLocalStorage({ user, token, location }) //when page refreshes access these values
        } catch (error) {
            //console.log(error.response);
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: { msg: error.response.data.msg }
            })
        }
        clearAlert()
    }

    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR })
    }

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removeUserFromLocalStorage()
    }

    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN })
        try {
            const { data } = await authFetch.patch('/auth/updateUser', currentUser)
            const { user, location, token } = data
            dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, location, token } })
            addUserToLocalStorage({ user, location, token })
            //console.log(data)
        } catch (error) {
            //console.log(error.response);
            if (error.response.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: { msg: error.response.data.msg }
                })
            }
        }
        clearAlert()
    }
    const handleChange = ({ value, name }) => {
        dispatch({
            type: HANDLE_CHANGE,
            payload: { name, value }
        })
    }
    const clearValues = () => {
        dispatch({
            type: CLEAR_VALUES
        })
    }
    const createDevice = async () => {
        dispatch({
            type: CREATE_JOB_BEGIN
        })

        try {
            const { position, company, jobLocation, jobType, status } = state

            await authFetch.post('/devices', {
                company,
                position,
                jobLocation,
                jobType,
                status,
            })
            dispatch({ type: CREATE_JOB_SUCCESS })
            dispatch({ type: CLEAR_VALUES })
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({
                type: CREATE_JOB_ERROR,
                payload: { msg: error.response.data.msg }
            })
        }
        clearAlert()
    }
    const getSensors = async () => {
        const { searchName, searchStatus, sort, page } = state

        let url = `/devices?page=${page}&status=${searchStatus}&sort=${sort}`

        if (searchName) {
            url = url + `&search=${searchName}`
        }
        dispatch({ type: GET_JOBS_BEGIN })
        try {
            const { data } = await authFetch(url)
            const { sensors, numOfPages, totalSensors } = data
            dispatch({
                type: GET_JOBS_SUCCESS,
                payload: {
                    sensors, numOfPages, totalSensors
                }
            })
        } catch (error) {
            //if we hit 401 auth err & 500 we just log out user
            console.log(error.response);
            //logoutUser()
        }
        //delay on alert
        //if u ad job in add job section and quickly switch to all jobs
        //an alert is still displayed (new job created or smth like that)
        clearAlert()
    }

    // for testing
    // useEffect(() => {
    //     getJobs()
    // }, [])

    const setEditDevice = (id) => {
        // console.log(`set edit job : ${id}`);
        dispatch({ type: SET_EDIT_JOB, payload: { id } })
    }

    const editJob = async () => {
        //console.log('edit job');
        dispatch({ type: EDIT_JOB_BEGIN })
        try {
            const { position, company, jobLocation, jobType, status } = state
            await authFetch.patch(`/devices/${state.editJobId}`, {
                position,
                company,
                jobLocation,
                jobType,
                status
            })
            dispatch({ type: EDIT_JOB_SUCCESS }) //alert
            dispatch({ type: CLEAR_VALUES })
        } catch (error) {
            if (error.response === 401) return
            dispatch({
                type: EDIT_JOB_ERROR, payload: { msg: error.response.data.msg }
            })
        }
        clearAlert()
    }
    const deleteDevice = async (jobId) => {
        //console.log(`delete job : ${id}`);
        dispatch({ type: DELETE_JOB_BEGIN })
        try {
            await authFetch.delete(`/sensors/${jobId}`)
            getSensors()
        } catch (error) {
            console.log(error.response);
            //logoutUser()
        }
    }

    const showStats = async () => {
        dispatch({ type: SHOW_STATS_BEGIN })
        try {
            const { data } = await authFetch('/devices/stats') //if omit get then default is get
            dispatch({
                type: SHOW_STATS_SUCCESS,
                payload: {
                    stats: data.defaultStats,
                    monthlyApplications: data.monthlyApplications,
                }
            })
        } catch (error) {
            console.log(error.response)
            //logoutUser()
        }
        clearAlert()
    }
    const clearFilters = () => {
        dispatch({ type: CLEAR_FILTERS })
    }

    const changePage = (number) => {
        dispatch({ type: CHANGE_PAGE, payload: { number } })
    }
    return <AppContext.Provider value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createDevice,
        getSensors,
        setEditDevice,
        deleteDevice,
        editJob,
        showStats,
        clearFilters,
        changePage,
    }}>
        {children}
    </AppContext.Provider>
}

const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }