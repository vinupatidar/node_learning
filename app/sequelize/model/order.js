import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../connection/connection.js";
import { userSeqModel } from "./user.js";


class Order extends Model {}

const orderModel = Order.init({
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'order_id'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: { 
                args : [4, 10],
                msg: "name length should be 4 to 10 character"
            }
        }
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isFloat: true
        }
    }
}, {
    sequelize: sequelize,
    modelName: 'Order',
    timestamps: true,
    deletedAt: 'destroyTime',
    createdAt: 'createdBy',
    updatedAt: 'updatedBy',
    schema: "mySchema",
    indexes: [
        {
            name: 'pk_orderId',
            unique: true,
            fields: ['order_id']
        }
    ]
})

// orderModel.belongsTo(userSeqModel, {
//     foreignKey: 'user_id'
// });


//await orderModel.sync({ alter: true })

export { orderModel }