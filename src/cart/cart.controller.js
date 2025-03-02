import Product from "../products/products.model.js";
import Cart from "./cart.model.js";

export const myCart= async(req,res)=>{
    try{
        const idUser = req.user.uid
        const cart = await  Cart.findOne({user: idUser})
        .populate('user','name -_id')
        .populate({path:'products.product',select:'name description category  -_id'})
        .populate('total')
        return res.send({message: 'Your Cart:', cart})
    }catch(err){
        console.error(err)
        return res.status(500).send({message:'General error with getting my Cart'})
    }
}

export const updateCart = async(req,res)=>{
    try{
        const idUser= req.user.uid
        const idproduct = req.body.product
        const quantity = parseInt(req.body.quantity,10)
        const  product = await Product.findById(idproduct) 
        if(!product)
            return res.send({message: 'The product does not exits'})
        if(product.stock <= 0) 
            return res.send({message: 'We apologize, we ran out of this product'})
        if(product.stock<quantity)
             return res.send({message:`we only count with this amount of products:  ${product.stock}`})
        const cartW = await Cart.findOne({user: idUser})
        if(!cartW) return res.status(404).send({message: 'Not cart found'})
            //si el producto ya esta en el carro
        const existingProductIndex = cartW.products.findIndex(p => p.product.toString() === idproduct)
        if(existingProductIndex !== -1){
             cartW.products[existingProductIndex].quantity += quantity   
             //Si no hay suficente stock  
             if(cartW.products[existingProductIndex].quantity>product.stock){ 
                return res.send({message:'there is not enough product'})} 
     //Si el producto no esta en el carrito
        }else{
        cartW.products.push({product:product._id,quantity})
        }
        //Calcula el total de la compra
        const parcialTotal = cartW.products.reduce((total, item) => {
            const productPrice = product.price 
            return (productPrice * item.quantity);
        }, 0);
        cartW.total = cartW.total + parcialTotal;

        //Guarda la informacion del carrito 
        await cartW.save()

        return res.send({message:'Product added to your cart'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with adding stuff to the cart'})
    }
}

export const clearCart = async(req, res) => {
    try {
        const idUser = req.user.uid
        const cart = await Cart.findOne({ user: idUser })
        if (!cart) return res.status(404).send({ message: 'Not cart found' })

        cart.products = []
        cart.total = 0

        await cart.save()

        return res.send({ message: 'Cart cleared successfully', cart })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error with clearing the cart', err })
    }
}