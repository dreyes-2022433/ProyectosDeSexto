
import { Schema, model } from 'mongoose'
const cartSchema = new Schema({
    description: {
        type: String,
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
    }],
    total: {
        type: Number,
        maxLength: [10, `Can't be overcome 10 characters`],
        default: 0
    },
})

export default model('Cart', cartSchema)