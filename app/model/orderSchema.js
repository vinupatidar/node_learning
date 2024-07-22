import mongoose, { Schema } from "mongoose";
import { User } from "./userSchema.js";

const orderSchema = new Schema({
    "userId": {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    "product": {
        type: String,
        require: true
    },
    "amount" : {
        type: Number,
        require: true
    }
})

const orderModel = mongoose.model("Order", orderSchema)

export default orderModel;