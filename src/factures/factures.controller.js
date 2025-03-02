import Facture from "./factures.model.js"
import Cart from "../cart/cart.model.js"
import Product from "../products/products.model.js"
import {clearCart}from '../cart/cart.controller.js'


export const generateFacture = async(req,res)=>{
    try{
        let cartStuff = await Cart.findOne({user: req.user.uid})
        if(cartStuff.products.length == 0) return res.send({message: 'You don`t have anything on your cart'})
        let facture = await Facture.create({
            factureNumber: Math.floor(Math.random()*99999),
            client: req.user.uid,
            products: cartStuff.products,
            total:cartStuff.total + cartStuff.total*0.12,
            description: `This is your proof of payment, unique and unrepeatable.`
        })
        for(let i = 0; i<facture.products.length;i++){
            let idproduct =  facture.products[i].product._id
            let quantity = facture.products[i].quantity 
            let product= await Product.findByIdAndUpdate(idproduct)
            if (product) {
                product.updateCount += 1
                product.stock -= quantity
                await product.save()
            }
                
        }
        const cart = await Cart.findOne({ user: req.user.uid })
                if (!cart) return res.status(404).send({ message: 'Not cart found' })
        
                cart.products = []
                cart.total = 0
        
                await cart.save()
        return res.send({message: 'Facture:',facture })
    
    }catch(err){
        console.error(err)
        return res.send({message:'general error'})
    }
}

export const getMyFactures = async(req,res)=>{
    try{
        let myFactures = await Facture.find({client: req.user.uid}).populate('client','name -_id')
        .populate('products.product','name price description -_id')

        return res.send({message: 'Your factures', myFactures})
    }catch(err){
        console.error(err)
        return res.send({message:'general error'})
    }
}