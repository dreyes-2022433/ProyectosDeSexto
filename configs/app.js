'use strict'

import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import authRoutes from "../src/auth/auth.routes.js"
import categoryRoutes from "../src/category/category.routes.js"
import userRoutes from "../src/users/users.routes.js"
import productsRoutes from "../src/products/products.routes.js"
import cartRoutes from '../src/cart/cart.routes.js'

const configs = app => {
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    //app.use(limiter)
    app.use(morgan('dev'))
}

const routes = (app) => {
    app.use(authRoutes)
    app.use('/v1/category',categoryRoutes)
    app.use('/v1/user/', userRoutes)
    app.use('/v1/product/',productsRoutes)
    app.use('/v1/cart',cartRoutes)
}

export const initServer = async()=>{
    const app = express() 
    try{
        configs(app) 
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        
        console.error('Server init failed', err)
    }
}