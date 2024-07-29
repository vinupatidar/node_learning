import express from "express";
const userRoute = express.Router();
import { connection } from "../connection/pg.js";


userRoute.get("/getUsers", async (req, res) => {
    try {
        // To set schema so not need to define in each query 
        //await connection.query('SET search_path TO myschema');

        // get rows key from return result whic have many other properties
        // This simple query return each row in json 
        const { rows } = await connection.query("select * from myschema.orders");

        // This will each row as array
        // const result = await connection.query({
        //     text: "select * from myschema.orders",
        //     rowMode: 'array'
        // });

        //console.log(rows);
        res.send(rows);
    } catch(err) {
        console.log("Error Message : ", err)
    } finally {
        connection.end();
    }
})

userRoute.get("/transaction", async (req, res) => {
    await connection.connect()
    try {
        console.log("Inside transaction")
        await connection.query("BEGIN");
        console.log("after begin")

        const insertResult = await connection.query("insert into myschema.user (name, surname, age, email, city, country) values ('vinu', 'patidar', 32, 'vinu@gmail.com', 'pune', 'India') ");
        console.log("insert ==> ", insertResult)

        // fail cse - const result = await connection.query("select * from myschema.user");
        const result = await connection.query("select * from myschema.user");
        console.log("Result -> ", result);

        await connection.query("COMMIT");

        res.send(result)
    } catch(err) {
        await connection.query("ROLLBACK")
        res.send(err);
    } finally {
        connection.end()
    }
})

export { userRoute };
