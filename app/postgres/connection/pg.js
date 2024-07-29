import pg from "pg"
const { Client } = pg;

const connection = new Client({
    user: 'avnadmin',
    password: 'AVNS_kyDeAGg6792v4Rv16KN',
    host: 'mypostgres-vitestproject.i.aivencloud.com',
    port: 17452,
    database: 'MyTestDB',
    ssl: {
        rejectUnauthorized: false
    }

})

// await connection.connect()
// .then(() => {
//     console.log("connected to pg db...")
// });
// connection.on("error", (err) => {
//     console.log("connection failed : ", err)
//     next(err)
// })

export { connection };

