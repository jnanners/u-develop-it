const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware (if extended: true you can post nested objects)
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//connect to database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Keishaisnumber1.",
        database: "election"
    },
    console.log("Connected to the election database.")
);

//GET a single candidte
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if(err){
//         console.log(err)
//     }
//     console.log(row);
// });

//DELETE a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if(err){
//         console.log(err);
//     }
//     console.log(result);
// })

//CREATE a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
            VALUES (?,?,?,?)`;
const params = [1, "Ronald", "Firbank", 1];

db.query(sql, params, (err, result) => {
    if(err){
        console.log(err);
    }
    console.log(result);
});

//Default response for any other request (Not Found). MUST BE THE LAST ROUTE
app.use((req, res) => {
    res.status(404).end();
})

app.listen(PORT, () => {
    console.log(`Sever running on port ${PORT}`);
});