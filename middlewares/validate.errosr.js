import { validationResult } from "express-validator" //Captura los resultados de las validaciones

export const validateErrors = (req, res, next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send(errors.array()) 
    }
    next()
}
