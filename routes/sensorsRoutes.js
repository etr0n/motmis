import express from 'express'
const router = express.Router()

import {
    createSensor,
    getAllSensors,
    updateSensor,
    deleteSensor,
    getSensorData,
    getAllSensorData
} from '../controllers/sensorsController.js'

router.route('/').post(createSensor).get(getAllSensors)

router.route('/devices-data').get(getAllSensorData)
router.route('/device-details/:id').get(getSensorData)

router.route('/:id').delete(deleteSensor).patch(updateSensor)

export default router