import { StatusCodes } from "http-status-codes"
import { BadRequestError, NotFoundError } from '../errors/index.js'
import checkPermissions from './../utils/checkPermissions.js'
import {
    create,
    find,
    countSensors,
    countSensorData,
    findOneSensor,
    remove,
    update,
    findData,
    findOneMeasurement,
    removeMeasurement,
    createMeasurement,
    findAllData,
    countAllSensorData,
    findAllUsersDevices,



    findAllUsersDevicesData
} from '../queries/Sensor.js'

const createSensor = async (req, res) => {
    const { name, model, latitude, longitude, status } = req.body

    if (!name || !model || !status || !latitude || !longitude) {
        throw new BadRequestError('Please provide all values')
    }
    req.body.createdBy = req.user.userId;
    const sensor = await create(req.body)
    res.status(StatusCodes.CREATED).json({ sensor })
}
const createSensorData = async (req, res) => {
    const { no2, o3, so2, co, temperature, humidity, pressure, pm25, pm10 } = req.body

    if (!no2) {
        req.body.no2 = null
    }
    if (!o3) {
        req.body.o3 = null
    }
    if (!so2) {
        req.body.so2 = null
    }
    if (!co) {
        req.body.co = null
    }
    if (!temperature) {
        req.body.temperature = null
    }
    if (!humidity) {
        req.body.humidity = null
    }
    if (!pressure) {
        req.body.pressure = null
    }
    if (!pm25) {
        req.body.pm25 = null
    }
    if (!pm10) {
        req.body.pm10 = null
    }
    const measurement = await createMeasurement(req.body)
    res.status(StatusCodes.CREATED).json({ measurement })
}
const getAllSensors = async (req, res) => {
    const { status, sort, search } = req.query

    //console.log(req.query);
    const queryObject = {
        createdByUser: req.user.userId,
    }

    if (status && status !== 'all') {
        queryObject.status = status
    }

    if (search) {
        queryObject.search = search
    }

    //console.log(queryObject);
    let result = await find(queryObject)
    //console.log('pries sorta', result);

    if (sort === 'latest') {
        result = result.sort((a, b) => b.created_at - a.created_at)
        //console.log('latest');
    }
    if (sort === 'oldest') {
        result = result.sort((a, b) => a.created_at - b.created_at)
        //console.log('oldest');
    }
    if (sort === 'a-z') {
        result = result.sort((a, b) => a.name.localeCompare(b.name))
        //console.log('a-z');
    }
    if (sort === 'z-a') {
        result = result.sort((a, b) => b.name.localeCompare(a.name))
        //console.log('z-a');
    }

    //console.log('po sorto', result);
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 4
    const skip = (page - 1) * limit
    //console.log(skip);
    let sensors = result.slice(skip, page * limit)
    // console.log(sensors);

    const totalSensors = await countSensors(queryObject)
    //console.log(totalSensors);

    const numOfPages = Math.ceil(totalSensors / limit)

    res.status(StatusCodes.OK).json({ sensors, numOfPages, totalSensors })
}
const updateSensor = async (req, res) => {
    // res.send('update job')
    const { id: sensorId } = req.params
    const { name, model, latitude, longitude, status } = req.body

    if (!name || !model || !latitude || !longitude || !status) {
        throw new BadRequestError('Please provide all values')
    }
    const sensor = await findOneSensor(sensorId)

    if (!sensor) {
        throw new NotFoundError(`No device with id: ${sensorId}`)
    }

    checkPermissions(req.user, sensor.fk_usersid_users)

    const updatedSensor = await update(name, model, status, latitude, longitude, sensorId)

    res.status(StatusCodes.OK).json({ updatedSensor })
}
const deleteSensor = async (req, res) => {
    const { id: sensorId } = req.params
    const sensor = await findOneSensor(sensorId)

    if (!sensor) {
        throw new NotFoundError(`No device with id: ${sensorId}`)
    }
    checkPermissions(req.user, sensor.fk_usersid_users)
    await remove(sensorId)
    res.status(StatusCodes.OK).json({ msg: 'Success! Device removed' })

}
const deleteSensorData = async (req, res) => {
    const { id: measurementId } = req.params
    const measurement = await findOneMeasurement(measurementId)

    if (!measurement) {
        throw new NotFoundError(`No measurement with id: ${measurementId}`)
    }
    //checkPermissions(req.user, sensor.fk_usersid_users)
    await removeMeasurement(measurementId)
    res.status(StatusCodes.OK).json({ msg: 'Success! Measurement removed' })

}
const getAllUsersDevices = async (req, res) => {
    let result = await findAllUsersDevices()
    console.log('result', result);
    let allUsersDevices = [];
    allUsersDevices = result.reduce((r, a) => {
        // console.log("a", a);
        //console.log('r', r);
        r[a.id_sensor] = [...r[a.id_sensor] || [], a];
        return r;
    }, {});


    res.status(StatusCodes.OK).json({ allUsersDevices })
}

const getAllUsersDevicesData = async (req, res) => {
    const { id: id_sensor } = req.params
    console.log(id_sensor);
    let allUsersDevicesData = await findAllUsersDevicesData(id_sensor)
    // let allUsersDevices = [];
    // allUsersDevices = result.reduce((r, a) => {
    //     // console.log("a", a);
    //     //console.log('r', r);
    //     r[a.id_sensor] = [...r[a.id_sensor] || [], a];
    //     return r;
    // }, {});

    console.log(allUsersDevicesData);
    res.status(StatusCodes.OK).json({ allUsersDevicesData })
}

const getSensorData = async (req, res) => {
    const { sort } = req.query

    const { id: sensorId } = req.params

    const queryObject = {
        createdByUser: req.user.userId,
    }

    let result = await findData(queryObject, sensorId)

    if (sort === 'latest') {
        result = result.sort((a, b) => b.time - a.time)
        //console.log('latest');
    }
    if (sort === 'oldest') {
        result = result.sort((a, b) => a.time - b.time)
        // console.log('oldest');
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 4
    const skip = (page - 1) * limit

    let detailMeasurements = result.slice(skip, page * limit)

    const totalMeasurements = await countSensorData(queryObject, sensorId)

    const numOfPages = Math.ceil(totalMeasurements / limit)

    res.status(StatusCodes.OK).json({ detailMeasurements, numOfPages, totalMeasurements })
}
const getAllSensorData = async (req, res) => {
    const { sort } = req.query

    const queryObject = {
        createdByUser: req.user.userId,
    }

    let result = await findAllData(queryObject)

    if (sort === 'latest') {
        result = result.sort((a, b) => b.time - a.time)
        //console.log('latest');
    }
    if (sort === 'oldest') {
        result = result.sort((a, b) => a.time - b.time)
        // console.log('oldest');
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 4
    const skip = (page - 1) * limit

    let allMeasurements = result.slice(skip, page * limit)
    // console.log(AllMeasurements);

    const totalMeasurements = await countAllSensorData(queryObject)
    //console.log(totalMeasurements);

    const numOfPages = Math.ceil(totalMeasurements / limit)
    //console.log(numOfPages);

    res.status(StatusCodes.OK).json({ allMeasurements, numOfPages, totalMeasurements })
}

export {
    createSensor,
    getAllSensors,
    updateSensor,
    deleteSensor,
    getSensorData,
    deleteSensorData,
    createSensorData,
    getAllSensorData,
    getAllUsersDevices,

    getAllUsersDevicesData
}