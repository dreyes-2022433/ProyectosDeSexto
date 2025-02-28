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
        const quantity = req.body.quantity
        const  product = await Product.findById(idproduct) 
        if(!product)
            return res.send({message: 'The product does not exits'})
        if(product.stock <= 0) 
            return res.send({message: 'We apologize, we ran out of this product'})
        if(product.stock<quantity)
             return res.send({message:`we only count with this amount of products:  ${product.stock}`})
        const cartW = await Cart.findOne({user: idUser})
        if(!cartW) return res.status(404).send({message: 'Not cart found'})
        cartW.products.push({product:product._id,quantity})
        
        const parcialTotal = cartW.products.reduce((total, item) => {
            const productPrice = product.price; 
            return total + (productPrice * item.quantity);
        }, 0);
        cartW.total = parcialTotal;

        
        await cartW.save()

        return res.send({message:'Product added to your cart'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with adding stuff to the cart'})
    }
}