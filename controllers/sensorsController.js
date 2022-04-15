import { StatusCodes } from "http-status-codes"
import { BadRequestError, NotFoundError } from '../errors/index.js'
import checkPermissions from './../utils/checkPermissions.js'
import { create, find, count, limitAndSkip } from '../queries/Sensor.js'

const createSensor = async (req, res) => {
    const { name, model, latitude, longitude, status } = req.body

    if (!name || !model || !status || !latitude || !longitude) {
        throw new BadRequestError('Please provide all values')
    }
    req.body.createdBy = req.user.userId
    //console.log('body:::', req.body);
    const sensor = await create(req.body)
    res.status(StatusCodes.CREATED).json({ sensor })
}
const getAllSensors = async (req, res) => {
    const { status, sort, search } = req.query

    //console.log(req.query);
    const queryObject = {
        createdByUser: req.user.userId,
    }

    if (status && status !== 'all') {
        queryObject.status = status
    }

    if (search) {
        queryObject.search = search
    }

    //console.log(queryObject);
    let result = await find(queryObject)
    console.log('pries sorta', result);

    if (sort === 'latest') {
        result = result.sort((a, b) => b.created_at - a.created_at)
        console.log('latest');
    }
    if (sort === 'oldest') {
        result = result.sort((a, b) => a.created_at - b.created_at)
        console.log('oldest');
    }
    if (sort === 'a-z') {
        //result = result.sort((a, b) => b.name - a.name)
        result = result.sort((a, b) => a.name.localeCompare(b.name))
        console.log('a-z');
    }
    if (sort === 'z-a') {
        result = result.sort((a, b) => b.name.localeCompare(a.name))
        console.log('z-a');
    }

    console.log('po sorto', result);
    const page = Number(req.query.page) || 1
    console.log(page);
    const limit = Number(req.query.limit) || 4
    console.log(limit);

    const skip = (page - 1) * limit
    console.log(skip);
    let sensors = result.slice(skip, page * limit)
    //console.log(sliced);
    //result = await limitAndSkip(queryObject, limit, skip)

    //const sensors = result

    const totalSensors = await count(queryObject)
    //console.log(totalSensors);

    const numOfPages = Math.ceil(totalSensors / limit)

    res.status(StatusCodes.OK).json({ sensors, numOfPages, totalSensors })
}
export { createSensor, getAllSensors }