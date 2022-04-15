import { UnAuthenticatedError } from "../errors/index.js";
import jwt from 'jsonwebtoken'
//if the token is not provided we send 401

//if it is in place we pass to the next middleware 
//in our case the controller for the route that the user is trying to access
const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    //console.log(autHeader);
    if (!authHeader || !authHeader.startsWith('Bearer')) { //startsWith js function
        throw new UnAuthenticatedError('Authentication invalid')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        //console.log(payload);
        req.user = { userId: payload.userId }
    } catch (error) {
        throw new UnAuthenticatedError('Authentication invalid')
    }

    next()
}

export default auth