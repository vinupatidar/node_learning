import express from "express";
const userRoute = express.Router();
import { User, UserViewModel } from "../model/userSchema.js"
import { dbConnect } from "../db/mongoose.js";


// Save one records
userRoute.post("/create", (req, res, next) => {
    console.log("Inside user create")
    console.log(req.body);
    const user =  new User();
    user.userId = req.body.userId;
    user.name = req.body.name;
    user.age = req.body.age;
    user.phone = req.body.phone;
    user.email = req.body.email;
    user.save().then((data) => {
        console.log("Data Saved....", data)
        res.send(data);
    }).catch((err) => {
        console.log("Failed to save in User", err)
        res.send(err);

    })


})

// find all
userRoute.get("/users", async (req, res) => {
    const result = await User.find();
    console.log(result);
    res.send(result);
})

// find with where condition
userRoute.get("/userById/:ID", async (req, res) => {
    //console.log(req)
    const result = await User.find({"userId" : req.params.ID});
    console.log(result);
    res.send(result);
})

// findByOne
userRoute.get("/findByOne/:ID", async (req, res) => {
    //console.log(req)
    const result = await User.findOne({"userId" : req.params.ID});
    console.log(result);
    res.send(result);
})


// findById
userRoute.get("/findById/:ID", async (req, res) => {
    //console.log(req)
    const result = await User.findById(req.params.ID);
    console.log(result);
    res.send(result);
})

// findByIdAndUpdate

userRoute.put("/updateById/:ID", async ( req, res ) => {
    const result = await User.findByIdAndUpdate(req.params.ID, {
        "name" : req.body.name
    }, {
        returnDocument : "after",
        lean: true
    });
    res.send(result);
})

// findOneAndUpdate
userRoute.put("/findOneUpdate/:ID", async ( req, res ) => {
    const result = await User.findOneAndUpdate( { "userId" : req.params.ID }, {
        "name" : req.body.name
    }, {
        returnDocument : "after",
        lean: true
    });
    res.send(result);
})

userRoute.post("/insertMany", async ( req, res) => {
    console.log(req.body)
    const result = await User.insertMany(req.body);
    res.send(result);
})

userRoute.get("/viewById/:ID", async (req, res) => {
    //console.log(req)
    const result = await UserViewModel.find({"userId" : req.params.ID});
    console.log(result);
    res.send(result);
})

userRoute.get("/filter", async ( req, res ) => {
    console.log("iiiiii")
    const result = await User.find().select('name')
                    .where('age')
                    .gt(20)
                    .sort({age: -1})
                    .limit(5)
                    .exec();
                    
    res.send(result)
})

userRoute.get("/transaction", async (req, res) => {
    const session = await User.startSession();
    await session.startTransaction();

    try {
        const createQuery = new User();
        createQuery.userId = 15;
        createQuery.name = 'Chinnu';
        createQuery.surname = 'patidar'
        createQuery.age = 21;
        createQuery.phone = '9383829384';
        createQuery.email = 'chinnu@gmail.com';
        await createQuery.save();

        const result = await User.finds( { userIds : 16 });

        await session.commitTransaction();

        res.send(result)
    } catch (err) {
        console.log("err : ", err)
        await session.abortTransaction()
        req.send(err);
    } finally {
        await session.endSession();
    }



})



export { userRoute };