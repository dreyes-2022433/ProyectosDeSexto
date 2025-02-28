import Cart from "./cart.model.js";

export const myCart= async()=>{
    try{
        const idUser = req.user.uid
        const cart = await new Cart.find(idUser)
        return res.send({message: 'Your Cart:', cart})
    }catch(err){
        console.error(err)
        return res.status(500).send({message:'General error with getting my Cart'})
    }
}

export const updateCart = async()=>{
    try{
        const idUser= req.user.uid
        const product = req.body.product

        const cartW = await Cart.findOne({user: idUser})
        cartW.products.push({product})
        
        const parcialTotal = cartW.products.reduce((total, price)=>total + price)
        cartW.total = parcialTotal

        await cartW.save()
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with adding stuff to the cart'})
    }
}