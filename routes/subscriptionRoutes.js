import express from 'express'
const router = express.Router()

import {
    getAllSubscriptions,
    deleteSubscription
} from '../controllers/subscriptionController.js'

router.route('/').get(getAllSubscriptions)
router.route('/:id').delete(deleteSubscription)

export default router