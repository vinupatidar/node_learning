import express from "express";
const nodeRoute = express.Router();

nodeRoute.get("/", (req, res) => {



    
    res.send("hiiii")
})

export { nodeRoute };
