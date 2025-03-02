
import { Schema, model } from "mongoose"

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxLength: [25, `Can't be overcome 25 characters`],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        maxLength: [10, `Can't be overcome 10 characters`],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxLength: [75, `Can't be overcome 75 characters`],
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required'],
        maxLength: [75, `Can't be overcome 75 characters`],
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
    updateCount: { type: Number, default: 0 },
})

export default model('Product', productSchema)