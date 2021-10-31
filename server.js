const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({  extended: false  }));
app.use(express.json());

//connect to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'spicyTuna24wks!',
    database: 'election'
},
console.log('Connected to election database.')
);

//GET a single candidate
//db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
    //if (err) {
        //console.log(error)
    //}
    //console.log(row);
//});
//Delete a candidate
//db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, results) => {
    //if (err) {
        //console.log(err);
    //}
    //console.log(results);
//});

//create a candidate
//const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//VALUES (?,?,?,?)`;

//const params = [1, 'Ronald', 'Firbank', 1];
//db.query(sql, params, (err, result) => {
    //if (err) {
        //console.log(err);
    //}
    //console.log(result);
//});

//return all data in the candidates table
//db.query(`SELECT * FROM candidates`, (err, rows) => {
    //console.log(rows);
//});

//catchall route
//handle user requests not supported by the app (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});