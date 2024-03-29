import { UnAuthenticatedError } from '../errors/index.js'

const checkPermissions = (requestUser, resourceUserId) => {
    //console.log(requestUser);
    if (requestUser.userId === resourceUserId) return
    throw new UnAuthenticatedError('Not authorized to access this route')
}

export default checkPermissions