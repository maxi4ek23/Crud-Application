const express = require("express");
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

let mysqlConnection = mysql.createConnection(require("./db_config"));

mysqlConnection.connect((err) => {
    if (err) {
        console.log('Connection is failed', err)
    }
    else {
        console.log('Connection is successful')
    }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



app.post("/animal", (req, res) => {
    mysqlConnection.query(
        "INSERT INTO animal(name, description, daily_expense, anim_type) values(?,?,?,?)",
        [
        req.body.name,
        req.body.description,
        req.body.daily_expense,
        req.body.anim_type,
        ],
        (err, response) => {
            if (!err) {
                res.send("Animal has been inserted succesfull");
            } else {
                throw err;
            }
        }
    );
});

app.get("/animal", (req, res) => {
    mysqlConnection.query("SELECT * FROM animal", (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log('trouble')
            throw err;
        }
    });
});

app.delete("/animal/:id", (req, res) => {
    mysqlConnection.query('DELETE FROM animal WHERE id=?', [req.params.id],(err, rows, fields)=>{
        if(!err) {
            res.send('Animal has been deleted successfully');
        } else {
            throw err;
        }
    })
});

app.put("/animal/:id", (req, res) => {
    mysqlConnection.query('UPDATE animal SET name=?, description=?, daily_expense=?, anim_type=? WHERE id=?', 
    [
        req.body.name,
        req.body.description,
        req.body.daily_expense,
        req.body.anim_type,
        req.params.id
    ],
    (err, rows, fields)=>{
        if(!err) {
            res.send('Animal has been updated successfully');
        } else {
            console.log('lol')
            throw err;
        }
    })
});