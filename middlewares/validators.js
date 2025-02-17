import {body} from "express-validator"
import { validateErrors } from "./validate.errosr.js"
import { existUsername, exitsCategory } from "../helpers/db.validators.js"


//Category validations
export const categoryValidate= [
    body('name', 'name is required')
    .notEmpty().custom(exitsCategory),
    body('description','description is required')
    .notEmpty(),
    validateErrors
]
export const categoryUpdateValidate= [
    body('name', 'name is required')
    .optional().notEmpty().custom(exitsCategory),
    body('description','description is required')
    .optional().notEmpty(),
    validateErrors
]

//UsersValidators

export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email')
        .notEmpty()
        .isEmail(),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
    body('phone', 'Phone cannot be empty or is not a valid phone')
        .notEmpty()
        .isMobilePhone(),
    validateErrors
]

export const userUpdateValidator = [
    body('name', 'Name cannot be empty')
        .optional().notEmpty(),
    body('surname', 'Surname cannot be empty')
        .optional().notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email')
        .optional().notEmpty()
        .isEmail(),
    body('username', 'Username cannot be empty')
        .optional().notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('phone', 'Phone cannot be empty or is not a valid phone')
        .optional().notEmpty()
        .isMobilePhone(),
    validateErrors
]

//Products Validations

export const productsValidator = [
body('name', 'Name cannot be empty')
    .notEmpty().toLowerCase(),
body('price', 'price cannot be empty')
    .notEmpty(),
body('description', 'description cannot be empty')
    .notEmpty(),
body('stock','stock cannot be empty')
    .notEmpty(),
body('category','category cannot be empty')
    .notEmpty
]

export const productsUpdateValidator = [
    body('name', 'Name cannot be empty')
        .optional().notEmpty().toLowerCase(),
    body('price', 'price cannot be empty')
        .optional().notEmpty(),
    body('description', 'description cannot be empty')
        .optional().notEmpty(),
    body('stock','stock cannot be empty')
        .optional().notEmpty(),
    body('category','category cannot be empty')
        .optional().notEmpty
    ]
    
