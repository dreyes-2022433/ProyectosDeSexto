import { Router } from 'express'
import { 
    registerUser,
    deleteUser, 
    updateUser,
    findAllUsers
} from './users.controller.js'
import { validateJwt, verifyAdminRole } from '../../middlewares/validate.jwt.js'
import { registerValidator, userUpdateValidator } from '../../middlewares/validators.js'


const api = Router()

//Rutas privadas
api.post('/',[validateJwt, verifyAdminRole, registerValidator],registerUser)

api.put('/:id',[validateJwt, verifyAdminRole, userUpdateValidator],updateUser)

api.put('/',[validateJwt, verifyAdminRole],deleteUser)

api.get('/',[validateJwt, verifyAdminRole],findAllUsers)
export default api