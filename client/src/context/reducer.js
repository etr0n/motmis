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
    SHOW_MODAL,
} from './actions'
import { initialState } from './appContext'

const reducer = (state, action) => {

    if (action.type === SHOW_MODAL) {
        return {
            ...state,
            showModal: true
        }
    }
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: 'danger',
            alertText: 'Please provide all values!'
        }
    }
    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: '',
        }
    }
    if (action.type === CHANGE_ISMEMBER_STATE) {
        return {
            ...state,
            isMember: action.payload.isMember
        }

    }
    if (action.type === REGISTER_USER_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }
    if (action.type === REGISTER_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            showAlert: true,
            alertType: 'success',
            alertText: 'User Created! Redirecting...'
        }
    }
    if (action.type === REGISTER_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    if (action.type === LOGIN_USER_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }
    if (action.type === LOGIN_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            showAlert: true,
            alertType: 'success',
            alertText: 'Login Successful! Redirecting...'
        }
    }
    if (action.type === LOGIN_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    if (action.type === TOGGLE_SIDEBAR) {
        return {
            ...state,
            showSidebar: !state.showSidebar,
        }
    }
    if (action.type === LOGOUT_USER) {
        return {
            ...initialState,
            user: null,
            token: null,
            userLocation: "",
        }
    }
    if (action.type === UPDATE_USER_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }
    if (action.type === UPDATE_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            showAlert: true,
            alertType: 'success',
            alertText: 'User Profile Updated!'
        }
    }
    if (action.type === UPDATE_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    if (action.type === HANDLE_CHANGE) {
        return {
            ...state,
            page: 1,
            [action.payload.name]: action.payload.value
        }
    }
    if (action.type === CLEAR_VALUES) {

        const initialState = {
            isEditing: false,
            editDeviceId: '',
            name: '',
            model: '',
            latitude: '',
            longitude: '',
            status: 'active',
        }
        return {
            ...state,
            ...initialState,
        }
    }
    if (action.type === CREATE_DEVICE_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }
    if (action.type === CREATE_DEVICE_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "success",
            alertText: "New Device Created!",
        }
    }
    if (action.type === CREATE_DEVICE_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg,
        }
    }
    if (action.type === GET_DEVICES_BEGIN) {
        return {
            ...state,
            isLoading: true,
            showAlert: false
        }
    }
    if (action.type === GET_DEVICES_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            sensors: action.payload.sensors,
            totalSensors: action.payload.totalSensors,
            numOfPages: action.payload.numOfPages,
        }
    }
    if (action.type === SET_EDIT_DEVICE) {
        const device = state.sensors.find((device) => device.id_sensor === action.payload.id)
        const { id_sensor, name, model, latitude, longitude, status } = device
        return {
            ...state,
            editDeviceId: id_sensor,
            name,
            model,
            latitude,
            longitude,
            status
        }
    }
    if (action.type === DELETE_DEVICE_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }
    if (action.type === EDIT_DEVICE_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }
    if (action.type === EDIT_DEVICE_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'device updated!'
        }
    }
    if (action.type === EDIT_DEVICE_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }
    if (action.type === SHOW_STATS_BEGIN) {
        return {
            ...state,
            isLoading: true,
            showAlert: false,
        }
    }
    if (action.type === SHOW_STATS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            stats: action.payload.stats,
            monthlyApplications: action.payload.monthlyApplications,
        }
    }
    if (action.type === CLEAR_FILTERS) {
        return {
            ...state,
            searchName: "",
            searchStatus: "all",
            sort: "latest",
        }
    }
    if (action.type === CHANGE_PAGE) {
        return {
            ...state,
            page: action.payload.number
        }
    }
    throw new Error(`no such action: ${action.type}`)
}

export default reducer