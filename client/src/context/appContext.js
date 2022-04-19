import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
    CHANGE_ISMEMBER_STATE,
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
    CREATE_DEVICE_BEGIN,
    CREATE_DEVICE_SUCCESS,
    CREATE_DEVICE_ERROR,
    GET_DEVICES_BEGIN,
    GET_DEVICES_SUCCESS,
    SET_EDIT_DEVICE,
    DELETE_DEVICE_BEGIN,
    EDIT_DEVICE_BEGIN,
    EDIT_DEVICE_SUCCESS,
    EDIT_DEVICE_ERROR,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    CLEAR_FILTERS,
    CHANGE_PAGE,
} from './actions'
import axios from "axios"


const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const initialState = {
    isMember: true,
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    showSidebar: false,
    isEditing: false,
    editDeviceId: '',
    position: '',
    company: '',
    statusOptions: ["active", "offline"],
    status: 'active',
    name: '',
    model: '',
    latitude: '',
    longitude: '',
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

    const toggleIsMember = (isMember) => {
        dispatch({ type: CHANGE_ISMEMBER_STATE, payload: { isMember } })
    }

    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })
        try {
            const response = await axios.post('/api/v1/auth/register', currentUser)
            //console.log(response);
            const { user, token, location } = response.data
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: { user, token }
            })
            //local storage later
            addUserToLocalStorage({ user, token })
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
            const { user, token } = data
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: { user, token }
            })
            //local storage later
            addUserToLocalStorage({ user, token }) //when page refreshes access these values
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
            const { user, token } = data
            dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, token } })
            addUserToLocalStorage({ user, token })
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
            type: CREATE_DEVICE_BEGIN
        })

        try {
            const { name, model, latitude, longitude, status } = state

            await authFetch.post('/devices', {
                name,
                model,
                latitude,
                longitude,
                status,
            })
            dispatch({ type: CREATE_DEVICE_SUCCESS })
            dispatch({ type: CLEAR_VALUES })
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({
                type: CREATE_DEVICE_ERROR,
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
        dispatch({ type: GET_DEVICES_BEGIN })
        try {
            const { data } = await authFetch(url)
            const { sensors, numOfPages, totalSensors } = data
            dispatch({
                type: GET_DEVICES_SUCCESS,
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
        //if u ad DEVICE in add DEVICE section and quickly switch to all DEVICEs
        //an alert is still displayed (new DEVICE created or smth like that)
        clearAlert()
    }

    // for testing
    // useEffect(() => {
    //     getDEVICEs()
    // }, [])

    const setEditDevice = (id) => {
        // console.log(`set edit DEVICE : ${id}`);
        dispatch({ type: SET_EDIT_DEVICE, payload: { id } })
    }

    const editDEVICE = async () => {
        //console.log('edit DEVICE');
        dispatch({ type: EDIT_DEVICE_BEGIN })
        try {
            const { position, company, DEVICELocation, DEVICEType, status } = state
            await authFetch.patch(`/devices/${state.editDEVICEId}`, {
                position,
                company,
                DEVICELocation,
                DEVICEType,
                status
            })
            dispatch({ type: EDIT_DEVICE_SUCCESS }) //alert
            dispatch({ type: CLEAR_VALUES })
        } catch (error) {
            if (error.response === 401) return
            dispatch({
                type: EDIT_DEVICE_ERROR, payload: { msg: error.response.data.msg }
            })
        }
        clearAlert()
    }
    const deleteDevice = async (DEVICEId) => {
        //console.log(`delete DEVICE : ${id}`);
        dispatch({ type: DELETE_DEVICE_BEGIN })
        try {
            await authFetch.delete(`/sensors/${DEVICEId}`)
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
        toggleIsMember,
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
        editDEVICE,
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