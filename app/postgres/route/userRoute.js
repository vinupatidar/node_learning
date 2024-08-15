import express from "express";
const userSeqRoute = express.Router();
import { connection } from "../connection/pg.js";



userSeqRoute.post("/insert", async (req, res) => {
    connection.connect();
    try {
        const records = `
        insert into myschema.users (name, surname, age, email, city, country) 
            values ('raj', 'kumar', 23, 'raj@gmail.com', 'mumbai', 'India');
        `;
        const result = await connection.query(records);
        res.send(result);
    } catch(err) {
        console.log("Error Message : ", err)
    } finally {
        connection.end();
    }
})

userSeqRoute.get("/getUsers", async (req, res) => {
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

userSeqRoute.get("/transaction", async (req, res) => {
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

userSeqRoute.post("/createTriggerAndFuntion", async (req, res) => {
    await connection.connect()

    console.log("execution start...")
    
    try {
        //DROP TABLE IF EXISTS user_update_history; 
        const createTable = `
            
            CREATE TABLE IF NOT EXISTS myschema.user_update_history ( 
                id SERIAL, 
                name VARCHAR NOT NULL, 
                email VARCHAR NOT NULL, 
                age INTEGER NOT NULL, 
                update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
                PRIMARY KEY(id) 
            )
        `;
        await connection.query(createTable);
    
        // Create trigge funtion
        const triggerFun = `
            CREATE OR REPLACE FUNCTION myschema.records_last_update() 
                RETURNS TRIGGER 
                LANGUAGE PLPGSQL 
                AS
            $$
            BEGIN

                INSERT INTO myschema.user_update_history ( name, email, age, update_date )
                VALUES ( OLD.name, OLD.email, OLD.age, now() );

                RETURN NEW;
            END;
            $$
        `;
        await connection.query(triggerFun);

        // Create trigger

        const createTrigger = `
            CREATE OR REPLACE TRIGGER trigger_records_last_update 
                AFTER UPDATE
                ON myschema.users 
                FOR EACH ROW 
                EXECUTE PROCEDURE myschema.records_last_update()
        `;
        const resulttriggerFun = await connection.query(createTrigger);
        console.log("execution completed...")

        res.send(resulttriggerFun);
    } catch (err) {
        console.error("Error: ", err)
        res.send(err);
    } finally {
        connection.end();
    }
})

// Update to check Trigger
userSeqRoute.put("/update", async (req, res) => {

    await connection.connect()

    try {
        const result = await connection.query(`
            UPDATE myschema.users SET age = 32 
            WHERE user_id = 1;
        `);

        res.send(result);
    } catch(err) {
        console.log("Error Message : ", err)
    } finally {
        connection.end();
    }
})

// view
userSeqRoute.post("/viewCreate", async (req, res) => {

    await connection.connect()

    try {
        const createView = `
            create or replace view myschema.mytestview 
            as 
                select name, surname, age, email 
                from myschema.users;
                WITH CHECK OPTION
        `;
        
        const result = await connection.query(createView);
        res.send(result);
    } catch(err) {
        console.log("Error Message : ", err)
    } finally {
        connection.end();
    }


    // Delete a view
    // drop view view_name

    // view only update when it will pass where condition when we add this in last
    // WITH CHECK OPTION
})





export { userSeqRoute };
