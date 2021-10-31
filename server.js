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

//return all data in the candidates table
db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});


//catchall route
//handle user requests not supported by the app (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});