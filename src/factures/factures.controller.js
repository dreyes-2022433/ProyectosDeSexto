import Facture from "./factures.model.js"
import Cart from "../cart/cart.model.js"
import Product from "../products/products.model.js"
import {clearCart}from '../cart/cart.controller.js'


export const generateFacture = async(req,res)=>{
    try{
        let cartStuff = await Cart.findOne({user: req.user.uid})
        if(cartStuff.products.length == 0) return res.send({message: 'You don`t have anything on your cart'})
        let facture = new Facture({
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
            if(product.stock< quantity){
                facture.status = false
                return res.send({message:`The products that you selected, were taked, the amount of stock is ${product.stock}`})
                
            }
            if (product) {
                product.updateCount += 1
                product.stock -= quantity
                await product.save()
            }
                facture.save()
        }
                cartStuff.products = []
                cartStuff.total = 0
        
                await cartStuff.save()
        return res.send({message: 'Facture:',facture })
    
    }catch(err){
        console.error(err)
        return res.send({message:'general error'})
    }
}

export const updateFacture = async(req,res)=>{
    try{
        let id = req.body.id
        let dataP = req.body.product
        let dataQ = parseInt(req.body.quantity)
        let numeroDeproducto = req.body.numeroDeproducto
        let facture = await Facture.findById(id)
        if(!facture) return res.send({message: 'The facture does not exist'})
    
                //ingresa si le quita o le suma 
                let newQuantity = parseInt(facture.products[numeroDeproducto].quantity +(dataQ))
                //valida los valores para que no sean negativos y el stock
                if(newQuantity<0) return res.send({message:'You cannot remove more than you have on your cart'})
        
                //le coloca a los productos los parametros que le vamos a actualizar
          facture.products[numeroDeproducto].set({product:dataP,quantity:newQuantity})
          let product = await Product.findOne({_id:facture.products[numeroDeproducto].product._id})
          if(newQuantity>product.stock)  return res.send({message:`The current produc stock is: ${product.stock}`})
          //Actualizamos el stock
          product.stock = product.stock -(dataQ)
          product.save()
          facture.status = true
          facture.total += product.price*(dataQ)
          facture.save()
        return res.send({message: 'your new facture', facture})
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