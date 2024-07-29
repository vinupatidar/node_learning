import express from "express";
const userSeqRoute = express.Router();
import { userSeqModel } from "../sequelize/model/user.js";
import { Op, QueryTypes } from "sequelize";
import sequelize from "../sequelize/connection/connection.js";
import { orderModel } from "../sequelize/model/order.js";

userSeqRoute.post("/create", async (req, res) => {
    //await userSeqModel.sync({});
    const body = req.body;
    const userDetails = await userSeqModel.create(body)
    res.send(userDetails);
})

userSeqRoute.post("/bulkCreate", async (req, res) => {
    //await userSeqModel.sync();
    const userDetails = userSeqModel.bulkCreate(req.body, {
        validate: true // bulkCreate don't check validation bydefault until mention here
    });
    res.send(userDetails);

})

userSeqRoute.put("/userUpdate", async (req, res) => {
    const userDetails = await userSeqModel.update({
        'surname' : 'patidar',
        'name': 'ramm'
    }, {
        where: {
            'user_id' : 3
        }
    });
    res.send(userDetails)
})

userSeqRoute.delete("/userDelete", async (req, res) => {
    const userDetails = await userSeqModel.destroy({  // // this will restore deleted row again
    //const userDetails = await userSeqModel.restore({
        where: {
            'user_id' : 3
        }
    });
    console.log('details : ', userDetails)
    res.send(userDetails)
})

userSeqRoute.get("/users", async (req, res) => {
    const userDetails = await userSeqModel.findAll();
    res.send(userDetails)
})

userSeqRoute.get("/users/:id", async (req, res) => {
    const userDetails = await userSeqModel.findByPk(req.params.id);
    res.send(userDetails)
})

userSeqRoute.get("/usersWhere", async (req, res) => {
    const userDetails = await userSeqModel.findAll({
        attributes : [     // This return require column name like select name, age from table
            //'name',
            //'age',
            ['city', 'city_name'], 
            [sequelize.fn('COUNT', sequelize.col('age')),'count'] // this count for group condition

            //more attributes types
            /*
                attributes: ['foo', ['bar', 'baz'], 'qux'], --> like - SELECT foo, bar AS baz, qux FROM ...
                
                Model.findAll({  --> like - SELECT foo, COUNT(hats) AS n_hats, bar FROM ...
                    attributes: ['foo', [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats'], 'bar'],
                });

                attributes: {
                    include: [[sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats']],
                },
            */

           // attributes: { exclude: ['baz'] }, // It will show all column name otherthen this

        ],
        where: {
            age: {              // where where age > 15
                [Op.gt] : 15
            },
            //city: 'pune',     // where city = 'pune
        },
        //limit: 3,             // This will return top 3 records
        //offset: 1,            // This will return return afer leaving first records, start from 2
        //group: 'city_name',   // Group by city name
        group: [                // This another example for group by like order
            ['city_name']
        ],
        order: [                 // diff way for ordering
            //['name', 'DESC'],  // default is ASC, for desc mention in capital letter DESC
            //['createdBy']      // Its ASC order
            //['age', 'DESC']
            //[sequelize.fn('max', sequelize.col('age')), 'DESC']
            
        ]
        
    });
    res.send(userDetails)
})

userSeqRoute.get("/extra", async (req, res) => {
    //const userDetails = await userSeqModel.max('age'); // output -> 55
    //const userDetails = await userSeqModel.increment({'age': 5}, { where : { user_id: 2 }})
    const userDetails = await userSeqModel.count({ where : { 'city' : 'pune'}}) // output -> 3
    console.log('users', userDetails)
    res.send(userDetails);   
})

userSeqRoute.get("/moreWhere", async (req, res) => {
    
    const userDetails = await userSeqModel.findAll({
        where: {
            //[Op.and] : [{ 'city': 'pune'}, {'age': { [Op.gt] : 25 } } ]
            [Op.or] : [{ 'city': 'pune'}, {'age': { [Op.gt] : 25 } } ]

            // authorId: {
            //     [Op.or]: [12, 13],
            //   },

            // where: {
            //     authorId: 12,
            //     status: 'active',
            //   },
        }
    })

    /*
    // More examples

    const { Op } = require("sequelize");
    Post.findAll({
    where: {
        [Op.and]: [{ a: 5 }, { b: 6 }],            // (a = 5) AND (b = 6)
        [Op.or]: [{ a: 5 }, { b: 6 }],             // (a = 5) OR (b = 6)
        someAttribute: {
        // Basics
        [Op.eq]: 3,                              // = 3
        [Op.ne]: 20,                             // != 20
        [Op.is]: null,                           // IS NULL
        [Op.not]: true,                          // IS NOT TRUE
        [Op.or]: [5, 6],                         // (someAttribute = 5) OR (someAttribute = 6)

        // Using dialect specific column identifiers (PG in the following example):
        [Op.col]: 'user.organization_id',        // = "user"."organization_id"

        // Number comparisons
        [Op.gt]: 6,                              // > 6
        [Op.gte]: 6,                             // >= 6
        [Op.lt]: 10,                             // < 10
        [Op.lte]: 10,                            // <= 10
        [Op.between]: [6, 10],                   // BETWEEN 6 AND 10
        [Op.notBetween]: [11, 15],               // NOT BETWEEN 11 AND 15

        // Other operators

        [Op.all]: sequelize.literal('SELECT 1'), // > ALL (SELECT 1)

        [Op.in]: [1, 2],                         // IN [1, 2]
        [Op.notIn]: [1, 2],                      // NOT IN [1, 2]

        [Op.like]: '%hat',                       // LIKE '%hat'
        [Op.notLike]: '%hat',                    // NOT LIKE '%hat'
        [Op.startsWith]: 'hat',                  // LIKE 'hat%'
        [Op.endsWith]: 'hat',                    // LIKE '%hat'
        [Op.substring]: 'hat',                   // LIKE '%hat%'
        [Op.iLike]: '%hat',                      // ILIKE '%hat' (case insensitive) (PG only)
        [Op.notILike]: '%hat',                   // NOT ILIKE '%hat'  (PG only)
        [Op.regexp]: '^[h|a|t]',                 // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
        [Op.notRegexp]: '^[h|a|t]',              // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
        [Op.iRegexp]: '^[h|a|t]',                // ~* '^[h|a|t]' (PG only)
        [Op.notIRegexp]: '^[h|a|t]',             // !~* '^[h|a|t]' (PG only)

        [Op.any]: [2, 3],                        // ANY (ARRAY[2, 3]::INTEGER[]) (PG only)
        [Op.match]: Sequelize.fn('to_tsquery', 'fat & rat') // match text search for strings 'fat' and 'rat' (PG only)

        // In Postgres, Op.like/Op.iLike/Op.notLike can be combined to Op.any:
        [Op.like]: { [Op.any]: ['cat', 'hat'] }  // LIKE ANY (ARRAY['cat', 'hat'])

        // There are more postgres-only range operators, see below
        }
    }
    });

    */

    res.send(userDetails);   
})


userSeqRoute.post('/transaction', async (req, res) => {
    const t = await sequelize.transaction();

    try {

        const payload = {
            "name" : "ravi",
            "surname" : "kumar",
            "age" : 26,
            "email" : "ravi@gmail.com",
            "city" :  "pune",
            "country" : "India"
        }
        console.log("after payload")
        const saveResult = await userSeqModel.create(payload, { transaction: t });
        console.log("after cretae", saveResult)
        const result = await userSeqModel.findAll(
            { 
                where: {
                    email : "ravi@gmail.com", 
                },
                transaction : t 
            }
        );
        await t.commit()
        res.send(result);

    } catch(err) {
        console.log("err : ", err);
        await t.rollback();
        res.send(err);
    }
})  


userSeqRoute.get("/rawQuery", async (req, res) => {

    /*
        Query Types
        Sequelize supports different query types that can be specified using the type option. Some of the query types include:

        SELECT: For SELECT queries.
        INSERT: For INSERT queries.
        UPDATE: For UPDATE queries.
        DELETE: For DELETE queries.
        RAW: For raw queries that are not one of the above.
    */

    console.log("Inside raw query")
    const result = await sequelize.query("SELECT * FROM Users"
    //, {
    //     //model: userSeqModel
    //     type: QueryTypes.SELECT,
    //     model: userSeqModel
    // }
    )
    console.log("After raw query", result)
    res.send(result)

})

userSeqRoute.get("/queryInterface", async (req, res) => {
    console.log("viiii")
    const queryInterface = sequelize.getQueryInterface();
    const result = await queryInterface.bulkInsert('`mySchema`.`Users`', [{
        "name" : "prakash",
        "surname" : "singh",
        "age" : 53,
        "email" : "prakash@gmail.com",
        "city" :  "pune",
        "country" : "India"
    }, {
        "name" : "swapnil",
        "surname" : "sharma",
        "age" : 45,
        "email" : "swapnil@gmail.com",
        "city" :  "mumbai",
        "country" : "India"
    }])
    res.send(result)

})

userSeqRoute.get("/associate", async (req, res) => {
    console.log("-------hh")
    const result = await userSeqModel.findAll({
        include: [
            {
                model: orderModel,
                as: "orders",
                attributes: ['name', 'price']
            }
        ]
    });
    console.log(result);
    res.send(result);
})

export { userSeqRoute };
