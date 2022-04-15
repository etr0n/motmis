import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'
import { userCreate, userEmailExist, userFind, userFindById, userUpdate } from '../queries/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const register = async (req, res) => { //next passes to next middleware
    const { name, lastName, email, password, location } = req.body

    if (!name || !email || !password) {
        throw new BadRequestError('please provide all values')
    }

    const userALreadyExists = await userEmailExist(email) //destruct
    // console.log(userALreadyExists);
    if (userALreadyExists) {
        throw new BadRequestError('Email already taken')
    }

    const hashPassword = await hash(password)

    const user = await userCreate(name, lastName, email, hashPassword, location)
    const token = createJWT(user.id)
    res.status(StatusCodes.CREATED).json({
        user: {
            email: user.email,
            lastName: user.lastName,
            location: user.location,
            name: user.name
        },
        token,
        location: user.location,
    })
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError('Please provide all values')
    }

    const { user, rowCount } = await userFind(email)
    //console.log(user);

    if (rowCount !== 1) {
        throw new UnAuthenticatedError('Invalid Credentials') //pretty vague error explanation - provide as little data as possible
    }

    const isPasswordCorrect = await comparePasswords(password, user.password)

    if (!isPasswordCorrect) {
        throw new UnAuthenticatedError('Invalid Credentials')
    }

    const token = createJWT(user.id)

    user.password = undefined //don't send back sensitive data
    user.rowCount = undefined
    user.createdAt = undefined
    user.updatedAt = undefined
    res.status(StatusCodes.OK).json({ user, token })
}

const updateUser = async (req, res) => {
    const { email, name, lastName, location } = req.body
    if (!email || !name || !lastName || !location) {
        throw new BadRequestError('Please provide all values')
    }


    let user = await userFindById(req.user.userId) //from JWT function?
    // console.log(req.user)
    user = await userUpdate(req.user.userId, name, lastName, location, email)


    const token = createJWT(req.user.userId)

    res.status(StatusCodes.OK).json({ user, token, location: user.location })
}

const hash = async (password) => {
    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt)
    return password
}

const comparePasswords = async (candidatePassword, password) => {
    const isMatch = await bcrypt.compare(candidatePassword, password)
    return isMatch
}

const createJWT = (id) => {
    console.log(`Creating user with id ${id}`);
    return jwt.sign({ userId: id }, process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME })
}

export { register, login, updateUser }