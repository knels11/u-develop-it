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
//return all data in the candidates table. GET all candidates
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;

db.query(sql, (err, rows) => {
    if(err) {
        res.status(500).json({  error: err.message  });
        return;
    }
    res.json({
        message: 'success',
        data: rows
    });
});
});

//GET a single candidate
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];

db.query(sql, params, (err, row) => {
    if (err) {
        res.status(400).json({  error: err.message  });
        return;
    }
    res.json({
        message: 'success',
        data: row
    });
});
});
//create API endpoint, Delete a candidate
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, results) => {
        if (err) {
            res.statusMessage(400).json({  error: res.message  });
        } else if (!results.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: results.affectedRows,
                id: req.params.id
            });
        }
    });
});


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

//catchall route
//handle user requests not supported by the app (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});