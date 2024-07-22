import express from "express";
const app = express();
import { dbConnect } from "./db/mongoose.js"
import bodyParser from "body-parser";

app.use(bodyParser.json())
const PORT = 3000;
import { orderRoute } from "./routes/order.js";
import { nodeRoute } from "./routes/node.js";
import { userRoute } from "./routes/user.js";
import { userSeqRoute } from "./routes/userSeq.js";

//app.use(dbConnect);
app.get("/", (req, res) => {
      res.send("Hello World.....")
})

app.use("/order", orderRoute)
app.use("/node", nodeRoute)
app.use("/user", userRoute)
app.use("/seq/user", userSeqRoute);

app.use((err, req, res, next) => {
    console.log("Inside error middleware")
    res.send(err);
    next();
})

app.use((req, res) => {
    console.log("In last methos")
})


app.listen(PORT, () => {
    console.log("App listing on port: ", PORT)
})