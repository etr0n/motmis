import express from 'express'
const router = express.Router()

import { register, login, updateUser } from '../controllers/authController.js'
import authenticateUser from '../middleware/auth.js'

router.route('/register').post(register) //public
router.route('/login').post(login) //public
router.route('/updateUser').patch(authenticateUser, updateUser) //restricted

export default router