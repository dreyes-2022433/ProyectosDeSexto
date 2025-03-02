import Products from './products.model.js'
import Category from '../category/category.model.js'

export const addProducts = async(req,res)=>{
    try{
        let data = req.body
        let product =  new Products({...data})
        await product.save()
        return res.send({message: 'The product has been added', product})
    }catch(err){
        console.error(err)
        return res.send({message:'General error adding products',err})
    }

}

export const getAllProducts = async(req, res)=>{
    try{
        const{skip= 0, limit = 20} = req.query
        let products = await Products.find()
        .skip(skip)
        .limit(limit)
       if(products.length === 0)return res.status(404).send({message:'Not Products yet'})
        console.log(products)
        return res.send({
            message:'Products found',
            products
        })
        
    }catch(err){
        console.error(err)
        return res.status(500).send({messag:'General error '})
    }

}



export const verifyStock = async(req,res)=>{
    try{
        let stock = await Products.find({stock: 0})
        if(stock.length == 0) return res.send({message:'All products have at leats 1 unit'})
        return res.send({message: 'Products out of stock:', stock})
    }catch(err){
        console.error(err)
        return res.send({
            message: 'General error',err
        })
    }
}

export const updateProducto = async (req,res)=>{
    try{
        let id = req.body.id
        let newData = req.body
        let updatedproduct = await Products.findByIdAndUpdate(id,newData,{new:true})
        if(!updatedproduct ) return res.status(404).send({message: 'Product not found'})
            return res.send({message: 'product updated: ', updatedproduct})
    }catch(err){
        console.error(err)
        return res.send({
            message: ' General error',err
        })
    }

}

export const mostselledProducts = async(req,res)=>{
    try{
        let mostselledProducts = await Products.find({})
        .sort({updateCount: -1}).exec()
        return res.send({message: 'The most selled Products are:',mostselledProducts})
    }catch(err){
        console.error(err)
        return res.send({
            message: 'general error',err
        })
    }
}

export const findProduct = async(req,res)=>{
    try{
        let {name, category} = req.body

        let product = await Products.find({
            $or:
            [
                {name: name},
                {category: category}
            ]
        })

        if(!product) return res.send({message: 'Not product found with this param'})
            
        return res.send({message: 'product found',product})
    }catch(err){
        console.error(err)
        return res.send({
            message: 'general error',err
        })
    }
}

export const deleteProduct = async(req,res)=>{
    try{
        let id = req.body.id
        let deleteProduct = await Products.findByIdAndDelete(id)
        if(!deleteProduct) return res.status(404).send({message: 'product not found '})
           return res.send({message: 'Product deleted: ', deleteProduct}) 
    }catch(err){
        console.error(err)
        return res.send({
            message: ' General error', err
        })
    }
}