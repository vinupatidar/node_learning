import { Sequelize } from "sequelize";
const sequelize = new Sequelize("dbname", "u", "p", {
    dialect: 'postgres',
    host: 'hname',
    protocol: 'postgres',
    port: 17452,
    pool: {
        min: 0,
        max: 1,
        idle: 1000
    },
    dialectOptions:{
        ssl: {
            //require: true,
            rejectUnauthorized: false,
        },
    }
})
try {
    await sequelize.authenticate();
    console.log("sequelize connected")
} catch(err) {
    console.log("Sequelize connection failed : ", err)
    sequelize.close();
}
export default sequelize;


// find queries
// insert queries
// update
// delete
// model schems setup with define an init
// model filed properties
// validation
// where conditions
// sort, limit, offset, group
// raw queries
// join
// query interface
// transaction
// trigger
// view
//