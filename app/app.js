import express from "express";
const app = express();
//import { dbConnect } from "./db/mongoose.js"
import bodyParser from "body-parser";
// import sequelize from "./sequelize/connection/connection.js";
// import { userSeqModel } from "./sequelize/model/user.js";
// import { orderModel } from "./sequelize/model/order.js";

// postgress raw connection with pg module
import { userRoute } from "./postgres/route/userRoute.js";


app.use(bodyParser.json())
const PORT = 3000;

app.use("/pg/user", userRoute);



// import { orderRoute } from "./routes/order.js";
// import { nodeRoute } from "./routes/node.js";
// import { userRoute } from "./routes/user.js";
// import { userSeqRoute } from "./routes/userSeq.js";
// import { orderSeqRoute } from "./routes/orderSeq.js";
// import { BelongsToMany } from "sequelize";
// //app.use(dbConnect);
// app.get("/", (req, res) => {
//       res.send("Hello World.....")
// })

// app.use("/order", orderRoute)
// app.use("/node", nodeRoute)
// app.use("/user", userRoute)
// app.use("/seq/user", userSeqRoute);
// app.use("/seq/order", orderSeqRoute);



// Sequelize associates - start

// As mentioned earlier and shown in most examples above, usually associations in Sequelize are defined in pairs:

// To create a One-To-One relationship, the hasOne and belongsTo associations are used together;
// To create a One-To-Many relationship, the hasMany and belongsTo associations are used together;
// To create a Many-To-Many relationship, two belongsToMany calls are used together.

// one to one relation
// userSeqModel.hasOne(orderModel, {
//     foreignKey: 'user_id',
//     as: 'orders'
// });

// one to many relation
// userSeqModel.hasMany(orderModel, {
//     foreignKey: 'user_id',
//     as: 'orders'
// });

// // order belongs to user -> means it will return all orde and user associate to that order
// // it work for hasMany and hasOne both
// orderModel.belongsTo(userSeqModel, {
//     foreignKey: 'user_id'
// });

// userSeqModel.belongsToMany(orderModel, {
//     through: 'user_order',
//     as: 'orders'
// })

// sequelize.sync( { alter : true} )

// sequelize associate - End

app.use((err, req, res, next) => {
    console.log("Inside error middleware", err)
    res.send(err);
    next();
})

app.use((req, res) => {
    console.log("In last methos")
})


app.listen(PORT, () => {
    console.log("App listing on port: ", PORT)
})