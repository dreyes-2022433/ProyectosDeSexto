
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
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxLength: [75, `Can't be overcome 75 characters`],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: [true, 'product is required']
    }],
    total: {
        type: Number,
        required: [true, 'Total is required'],
        maxLength: [10, `Can't be overcome 10 characters`],
        default: 0
    },
})

export default model('Facture', factureSchema)