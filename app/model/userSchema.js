import mongoose, { Schema } from "mongoose";

const schems = mongoose.Schema;
const userSchema = new Schema({
    userId: {
        type: Number,
        required: true,
        index: true,
    },
    name : {
        type: String,
        required: true,
        lowercase: true
    },
    surname : {
        type: String,
        required: true,
        lowercase: true
    },
    age: {
        type: Number,
        min: 18,
        max: 50
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);
await UserModel.createCollection();
const UserViewModel = mongoose.model("userView", userSchema);
// It will create a new Index
UserModel.collection.createIndex({ phone : 1 })
// It will sync all index mention in this schema and delete all index in collecton
// which is not define in schema except _id index
UserModel.syncIndexes();

// create view
UserViewModel.createCollection(
    //"usersView",
    {
        viewOn: "users",
        pipeline: [{
            $set : {
                fullName: {
                    $concat: [ "$name", "$surname"]
                }
            }
        }]
    }
)

export { UserModel as User, UserViewModel };