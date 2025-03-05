const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = express()

var hostname = "localhost";
var database = "citrusvine";
var port = "3306";
var username = "root";
var password = "|q(6;V542nat";

const db = mysql.createConnection({
  host: hostname,
  user: username,
  password,
  database,
  port,
});


app.use(cors())
app.use(express.json());

// app.get("/", (req, res) => {
//   res.json("hi this is the backend")
// })

app.get("/posts", (req, res) => {
  const q = "SELECT * FROM posts"
  db.query(q, (err, data) => {
    if (err) return res.json(err)
    else return res.json(data)
  })
})

// POST route to insert a new post into the database
app.post("/posts", (req, res) => {
  const q = "INSERT INTO posts (`body`, `date_time`) VALUES (?, ?)";
  const values = [
    req.body.body,
    req.body.date_time
  ]
  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Post created successfully!");
  });
});


// module.exports = { app, db }

app.listen(8800, () => {
  console.log("connected to db")
})

