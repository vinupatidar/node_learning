import mongoose from "mongoose";

export const dbConnect = mongoose.connect("mongodb+srv://vinodpatidar2050:vinodpatidar2050@myfirtstcluster.tgcd6vp.mongodb.net/test?retryWrites=true&w=majority&appName=MyFirtstCluster")
.then(() => {
    console.log("DB Connected");
}).catch(err => {
    console.log("Failed to connect to mongoose")
})

//vinodpatidar2050