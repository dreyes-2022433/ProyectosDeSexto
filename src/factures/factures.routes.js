import { Router } from 'express'
import {generateFacture,getMyFactures} from './factures.controller.js'

import { validateJwt, verifyAdminRole } from '../../middlewares/validate.jwt.js'

const api = Router()

api.get('/',[validateJwt],generateFacture)

api.get('/historial',[validateJwt],getMyFactures)
export default api