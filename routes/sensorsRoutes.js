import express from 'express'
const router = express.Router()

import {
    createSensor,
    getAllSensors
} from '../controllers/sensorsController.js'

router.route('/').post(createSensor).get(getAllSensors)
//remember about :id
//router.route('/stats').get(showStats).get(showStats)
//router.route('/:id').delete(deleteJob).patch(updateJob)

export default router