import express from 'express'
const router = express.Router()

import {
    createSensor,
    getAllSensors,
    updateSensor,
    deleteSensor,
    getSensorData,
    deleteSensorData,
    createSensorData,
    getAllSensorData
} from '../controllers/sensorsController.js'

router.route('/').post(createSensor).get(getAllSensors)

router.route('/details-device').post(createSensorData).get(getAllSensorData)

router.route('/details-device/:id').get(getSensorData).delete(deleteSensorData)

router.route('/:id').delete(deleteSensor).patch(updateSensor)

export default router