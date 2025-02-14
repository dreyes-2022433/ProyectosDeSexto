import { Schema, model } from "mongoose"

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        upperCase: true,
        maxLength: [25, `Can't be overcome 25 characters`],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxLength: [70, `Can't be overcome 70 characters`],
    }
})

export default model('Category', categorySchema)