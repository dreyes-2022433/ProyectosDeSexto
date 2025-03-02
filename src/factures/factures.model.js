
import { Schema, model } from 'mongoose'
const factureSchema = new Schema({
    factureNumber: {
        type: Number,
        required: [true, 'FactureNumbre is required'],
        maxLength: [25, `Can't be overcome 25 characters`],
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Client is required']
    },  
    products: [{
        product: {type: Schema.Types.ObjectId,ref:'Product'},
        quantity: {type: Number,default:1}
    }],
    total: {
        type: Number,
        maxLength: [10, `Can't be overcome 10 characters`],
        default: 0
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxLength: [75, `Can't be overcome 75 characters`],
    },
})

export default model('Facture', factureSchema)