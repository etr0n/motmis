import CustomAPIError from "./custom-api.js"
import { StatusCodes } from 'http-status-codes';

class UnAuthenticatedError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.StatusCode = StatusCodes.UNAUTHORIZED //401
    }
}

export default UnAuthenticatedError