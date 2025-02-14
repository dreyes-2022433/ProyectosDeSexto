import Products from './products.model.js'

export const addProducts = async(req,res)=>{
    try{
        let data = req.body
        let product = await new Products(data)
        await product.save()
        return res.semd({message: 'The product has been added', product})
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
        return res.send({
            message:'Products found',
            products
        })

    }catch(err){
        console.error(err)
        return res.status(500).send({messag:'General error '})
    }

}

export const getAproduct = async(req,res)=>{
    try{

    }catch(err){
        console.error(err)
        return res.send({
            message:'General error', err
        })
    }
}