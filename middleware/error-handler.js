import { StatusCodes } from 'http-status-codes'

const errorHandlerMiddleware = (err, req, res, next) => {
    //console.log(err)

    const defaultError = {
        StatusCode: err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR, //if error object has status code property use that, else use default 
        msg: err.message || 'Something went wrong, try again later'
    }
    if (err.name === 'ValidationError') {
        defaultError.StatusCode = StatusCodes.BAD_REQUEST
        //defaultError.msg = err.message
        defaultError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(',')
    }
    if (err.code && err.code === 11000) {
        defaultError.StatusCode = StatusCodes.BAD_REQUEST
        defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`
    }
    //res.status(defaultError.StatusCode).json({ msg: err })
    res.status(defaultError.StatusCode).json({ msg: defaultError.msg })
}

export default errorHandlerMiddleware