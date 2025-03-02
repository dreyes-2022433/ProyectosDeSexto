import { Router } from 'express'
import { 
    registerUser,
    deleteUser, 
    updateUser,
    findAllUsers,
    deleteOwnUser,
    updateProfile
} from './users.controller.js'
import { validateJwt, verifyAdminRole, verifyClientRole } from '../../middlewares/validate.jwt.js'
import { registerValidator, userUpdateValidator } from '../../middlewares/validators.js'


const api = Router()

//Rutas privadas
api.post('/',[validateJwt, verifyAdminRole, registerValidator],registerUser)

api.put('/',[validateJwt, verifyAdminRole, userUpdateValidator],updateUser)

api.put('/D',[validateJwt, verifyAdminRole],deleteUser)

api.put('/profile',[validateJwt,verifyClientRole,userUpdateValidator],updateProfile)

api.put('/ownUser',[validateJwt],deleteOwnUser)

api.get('/',[validateJwt, verifyAdminRole],findAllUsers)
export default api