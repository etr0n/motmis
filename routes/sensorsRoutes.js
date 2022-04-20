import express from 'express'
const router = express.Router()

import {
    createSensor,
    getAllSensors,
    updateSensor,
    deleteSensor
} from '../controllers/sensorsController.js'

router.route('/').post(createSensor).get(getAllSensors)
//remember about :id
//router.route('/stats').get(showStats).get(showStats)
router.route('/:id').delete(deleteSensor).patch(updateSensor)

export default router