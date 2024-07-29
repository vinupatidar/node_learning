import express from "express";
const orderRoute = express.Router();
import { userSeqModel } from "../sequelize/model/user.js";
import { orderModel } from "../sequelize/model/order.js";
//import sequelize from "../sequelize/connection/connection.js";


orderRoute.post('/createOrder', async (req, res) => {
    console.log("hello")
    
    console.log("hiii")
    const result = await orderModel.create({
        'name' : 'Shirt blue',
        'price': 500.50
    })
    res.send(result);
})

orderRoute.post('/bulkCreate', async (req, res) => {
    console.log("hello")
    
    console.log("hiii")
    const result = await orderModel.bulkCreate(req.body
        // {
        // 'name' : 'Shirt blue',
        // 'price': 500.50
        // }
    )
    res.send(result);
})

orderRoute.get("/belongToUser", async (req, res) => {
    const result = await orderModel.findAll({
        include: [{
            model: userSeqModel
        }]
    });
    res.send(result)
})

export { orderRoute as orderSeqRoute }