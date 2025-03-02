import { application, Router } from "express"
import { createCategory, getAllCategories,
    updateCategory, deleteCategory } from "./category.controller.js"
import { validateJwt, verifyAdminRole, /*verifyToken*/ } from "../../middlewares/validate.jwt.js"
import { categoryValidate,categoryUpdateValidate } from "../../middlewares/validators.js"

const api = Router()

api.post('/',[
    validateJwt,
    verifyAdminRole,
    categoryValidate,

], createCategory)

api.get('/',[
    validateJwt,
    verifyAdminRole,

], getAllCategories)

api.put('/', [
    validateJwt,
    verifyAdminRole,
    categoryUpdateValidate,

],updateCategory)

api.delete('/',[
    validateJwt,
    verifyAdminRole,
], deleteCategory)

export default api