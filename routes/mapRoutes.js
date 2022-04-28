import express from 'express'
const router = express.Router()

import {
    getAllUsersDevices
} from '../controllers/sensorsController.js'

router.route('/').get(getAllUsersDevices)

export default router