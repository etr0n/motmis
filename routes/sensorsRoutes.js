import express from 'express'
const router = express.Router()

import {
    createSensor,
    getAllSensors,
    updateSensor,
    deleteSensor,
    getSensorData,

} from '../controllers/sensorsController.js'

router.route('/').post(createSensor).get(getAllSensors)

router.route('/details-device/:id').get(getSensorData)

router.route('/:id').delete(deleteSensor).patch(updateSensor)

export default router