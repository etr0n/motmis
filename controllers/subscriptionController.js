import { StatusCodes } from "http-status-codes"
import { BadRequestError, NotFoundError } from '../errors/index.js'
import checkPermissions from './../utils/checkPermissions.js'

import {
    create,
    find,
    findAll,
    countAllSubscriptions,
    findOneSUbscription,
    remove,
} from '../queries/Subscription.js'


//butu gerai gauti sensoriaus id, kad patikrinti ar toks isvis egzistuoja
const createSubscription = async (req, res) => {
    const { sensorId, userId, name, latitude, longitude } = req.body

    //console.log(req.user.userId); kodel create neina, kitur eina!
    if (!sensorId || !userId || !name || !latitude || !longitude) {
        throw new BadRequestError('Not all values provided')
    }
    const alreadyExist = await find(req.body)
    // console.log(alreadyExist);
    if (alreadyExist) {
        throw new BadRequestError('Already subscribed')
    }
    const subscription = await create(req.body)
    res.status(StatusCodes.CREATED).json({ msg: 'Success! Subscription added' })
}

const getAllSubscriptions = async (req, res) => {
    const { sortSubscription } = req.query

    const queryObject = {
        createdByUser: req.user.userId,
    }


    let result = await findAll(queryObject)


    if (sortSubscription === 'a-z') {
        result = result.sort((a, b) => a.name.localeCompare(b.name))
        console.log('a-z');
    }
    if (sortSubscription === 'z-a') {
        result = result.sort((a, b) => b.name.localeCompare(a.name))
        console.log('z-a');
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 4
    const skip = (page - 1) * limit

    let allSubscriptions = result.slice(skip, page * limit)
    // console.log(AllMeasurements);

    const totalSubscriptions = await countAllSubscriptions(queryObject)
    //console.log(totalMeasurements);

    const numOfPages = Math.ceil(totalSubscriptions / limit)
    //console.log(numOfPages);

    res.status(StatusCodes.OK).json({ allSubscriptions, numOfPages, totalSubscriptions })
}

const deleteSubscription = async (req, res) => {
    const { id: subscriptionId } = req.params
    const subscription = await findOneSUbscription(subscriptionId)

    if (!subscription) {
        throw new NotFoundError(`No subscription with id: ${subscriptionId}`)
    }
    checkPermissions(req.user, subscription.fk_usersid_users)
    await remove(subscriptionId)
    res.status(StatusCodes.OK).json({ msg: 'Success! Unsubscribed' })

}
export {
    createSubscription,
    getAllSubscriptions,
    deleteSubscription
}