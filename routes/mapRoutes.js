import express from 'express'
const router = express.Router()

import {
    getAllUsersDevices,
} from '../controllers/sensorsController.js'

import {
    createSubscription,
} from '../controllers/subscriptionController.js'

router.route('/').get(getAllUsersDevices).post(createSubscription)

export default router