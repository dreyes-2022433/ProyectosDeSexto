import { Router } from "express"
import {
    addProducts,
    deleteProduct,
    getAllProducts,
    getAproduct,
    updateProducto
    
} from './products.controller.js'
import { validateJwt, verifyAdminRole } from '../../middlewares/validate.jwt.js'
import { productsUpdateValidator, productsValidator } from "../../middlewares/validators.js"

const api = Router ()

api.post('/',[validateJwt, verifyAdminRole, productsValidator], addProducts)

api.get('/',[validateJwt,verifyAdminRole],getAllProducts)

api.get('/BuscarProductos',[validateJwt,verifyAdminRole], getAproduct)

api.delete('/',[validateJwt,verifyAdminRole] ,deleteProduct)

api.put('/',[validateJwt,verifyAdminRole,productsUpdateValidator],updateProducto)


export default api