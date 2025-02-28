import { Route, Router } from 'express'
import {myCart,updateCart} from './cart.controller.js'

import { validateJwt, verifyClientRole, /*verifyToken*/ } from "../../middlewares/validate.jwt.js"
const api = Router()

api.get('/',[validateJwt,verifyClientRole],myCart)

api.put('/',[validateJwt,verifyClientRole],updateCart)

export default api