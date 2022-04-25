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
    createMeasurement
} from '../queries/Sensor.js'

const createSensor = async (req, res) => {
    const { name, model, latitude, longitude, status } = req.body

    if (!name || !model || !status || !latitude || !longitude) {
        throw new BadRequestError('Please provide all values')
    }
    req.body.createdBy = req.user.userId
    //console.log('body:::', req.body);
    const sensor = await create(req.body)
    res.status(StatusCodes.CREATED).json({ sensor })
}
const createSensorData = async (req, res) => {
    const { no2, o3, so2, co, temperature, humidity, pressure, pm25, pm10, time } = req.body

    // if (!name || !model || !status || !latitude || !longitude) {
    //     throw new BadRequestError('Please provide all values')
    // }
    //req.body.createdBy = req.user.userId
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
        console.log('latest');
    }
    if (sort === 'oldest') {
        result = result.sort((a, b) => a.created_at - b.created_at)
        console.log('oldest');
    }
    if (sort === 'a-z') {
        result = result.sort((a, b) => a.name.localeCompare(b.name))
        console.log('a-z');
    }
    if (sort === 'z-a') {
        result = result.sort((a, b) => b.name.localeCompare(a.name))
        console.log('z-a');
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
const getSensorData = async (req, res) => {
    const { sort } = req.query

    const { id: sensorId } = req.params

    const queryObject = {
        createdByUser: req.user.userId,
    }

    let result = await findData(queryObject, sensorId)

    if (sort === 'latest') {
        result = result.sort((a, b) => b.time - a.time)
        console.log('latest');
    }
    if (sort === 'oldest') {
        result = result.sort((a, b) => a.time - b.time)
        console.log('oldest');
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

}
export {
    createSensor,
    getAllSensors,
    updateSensor,
    deleteSensor,
    getSensorData,
    deleteSensorData,
    createSensorData,
    getAllSensorData
}