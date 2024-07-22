import express from "express";
const orderRoute = express.Router();
import orderModel from "../model/orderSchema.js"

orderRoute.post("/createOrder", async (req, res) => {
    const orderDetails = req.body;

    const orders = await orderModel.insertMany(orderDetails)
    res.send(orders)
})

orderRoute.get("/getOrder", async (req, res, next) => {
    
    const order = await orderModel.find()
    .populate({
        path: "userId",
        select: "name surname email -_id", // show specified column name, - means hide/aviod that 
        //name : { $ne : 'mannu'}  // filter ref table based on match condition
        //match : { age : { $gt :  30 }} // filter ref table based on match condition
        //options: { limit : 0 } // filter ref table based on match condition
    });
    res.send(order);
})

export { orderRoute };