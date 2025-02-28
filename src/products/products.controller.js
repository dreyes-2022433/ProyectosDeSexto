import Products from './products.model.js'


export const addProducts = async(req,res)=>{
    try{
        let data = req.body
        let product = await new Products(data)
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
        let products = await Products.find().populate('category','name -_id')
        .skip(skip)
        .limit(limit)
       if(products.length === 0)return res.status(404).send({message:'Not Products yet'})
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