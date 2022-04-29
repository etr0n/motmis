import express from 'express'
const router = express.Router()

import {
    getAllUsersDevices,

    getAllUsersDevicesData
} from '../controllers/sensorsController.js'

router.route('/').get(getAllUsersDevices)

router.route('/').get(getAllUsersDevicesData)

export default router