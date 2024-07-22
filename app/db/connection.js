import mongoose from "mongoose";
mongoose.connect('mongodb:127.0.0.1:27017')
.then(() => {
    console.last("Connected to MongoDB....")
})
.catch( (err) => {
    console.log("Failed to connect to mongoDB")
})