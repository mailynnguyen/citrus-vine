// App Initialization
const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = express()

app.use(cors());
app.use(express.json());


//Database Server
var hostname = "e7mhj.h.filess.io";
var database = "CitrusVineDB_oxygenbend";
var port = "3307";
var username = "CitrusVineDB_oxygenbend";
var password = "51eb7f921a83851a80e14c57d7c81c80624c1c12";

var db = mysql.createConnection({
  host: hostname,
  user: username,
  password,
  database,
  port,
});

// var hostname = "e7mhj.h.filess.io";
// var database = "CitrusVineDB_oxygenbend";
// var port = "3307";
// var username = "CitrusVineDB_oxygenbend";
// var password = "51eb7f921a83851a80e14c57d7c81c80624c1c12";

// var db = mysql.createConnection({
//   host: hostname,
//   user: username,
//   password,
//   database,
//   port,
// });

var db_path = 
db.connect(function (err) {
  if (err) throw err;
  console.log(`Connected to db: ${hostname}:${port}!`);
});

db.query("SELECT 1+1").on("result", function (row) {
  console.log(row);
});

app.listen(3307, () => {
  console.log(`App connected to db!`)
})
      
// Paths
const post_path = "/sosts"
const post_likes_path = "/PostLikes"

const comment_path = "/Comments"
const comment_likes_path = "/CommentLikes"

// Posts

//Helper
// app.get(post_likes_path, (req, res) => {
//         const join_query = "SELECT p.PostID FROM Posts P WHERE p.PostID = (`post_id`)"
//         const values = [
//                 req.body.post_id
//         ]
//         db.query(join_query, (err, data) => {
//                 if (err) { return res.json(err)}
//                 else { return res.json(`Incremented Po = ${values[req.body.post_id]}`)}
//         });
// });


//Jobs

app.get(post_path, (req, res) => {
        
        const values = [
                req.body.query
        ]
        const query = values
        // return res.json(`${query}`)
        db.query("SELECT * FROM Posts", (err, data) => {
                if (err) { 
                        return res.json(err) 
                }
                else {
                        result = res.json(data)
                        // return res.json(`Completed retrieval job!${res}`) 
                        return result;
                }
        });

});

// app.post(post_path, (req, res) => {
//         const values = [
//                 req.body.query
//         ]
//         const query = values[0]
//         db.query(query, (err, data) => {
//                 if (err) { return res.json(err) }
//                 else { return res.json(`Completed modify job!`) }
//         });
// });

var latest_post_id = 13
app.post(post_path, (req, res) => {
        const values = req.body
        const query = values
        // const query = `INSERT INTO Posts (PostID, UserID, Timestamp, Content, Anonymous) VALUES (${latest_post_id}, 1, '03/04/25', 'test', false)`
        return res.json(values)
        latest_post_id += 1
        db.query(query, (err, data) => {
                if (err) { return res.json(err) }
                else { return res.json(`Completed modify job!, ${query}`) }
        }); 
})
// app.post(post_path, (req, res) => {
//         const values = [
//                 req.body.query
//         ]
//         const query = values[0]
//         db.query(query, (err, data) => {
//                 if (err) { return res.json(err) }
//                 else { return res.json(`Completed modify job!`) }
//         });
// });

// app.post(post_path, (req, res) => {
        
//         const values = [
//                 req.body.job,
//                 req.body.post_id
//         ]
//         const job_string = req.body.job
//         const post_id = toString(values[1])
//         const join_query = `SELECT p.PostID FROM Posts P WHERE p.PostID = ${post_id}`

//         // var post_with_likes_table = con.GetPostsWithLikes(post_likes_path, values[1])
//         switch(job_string) {
//                 case "Increment":
//                         const increment_query = "UPDATE " + join_query + "as p " + "SET p.Likes = p.Likes + 1 WHERE p.PostID = " + post_id
//                         db.query(increment_query, (err, data) => {
//                                 if (err) { return res.json(err) }
//                                 else { return res.json(`Incremented Likes for PostID = ${post_id}`)}
//                         });
//                         break;
                
//                 case "Decrement":
//                         const decrement_query = "UPDATE " + join_query + "as p " + "SET p.Likes = p.Likes - 1 WHERE p.PostID = " + post_id
//                         db.query(decrement_query, (err, data) => {
//                                 if (err) { return res.json(err) }
//                                 else { return res.json(`Decremented Likes for PostID = ${post_id}`)}
//                         });
//                         break;
//         }
// });

// app.post(comment_path, (req, res) => {

//         const values = [
//                 req.body.job,
//                 req.body.comment_id
//         ]
//         const job_string = req.body.job
//         const comment_id = toString(req.body.comment_id)
//         const join_query = `SELECT c.CommentID FROM Comments C WHERE c.CommentID = ${comment_id}`

//         switch(job_string) {
//                 case "Increment":
//                         const increment_query = "UPDATE " + join_query + "as c " + "SET p.Likes = c.Likes + 1 WHERE c.CommentID = " + comment_id
//                         db.query(increment_query, (err, data) => {
//                                 if (err) { return res.json(err) }
//                                 else { return res.json(`Incremented Likes for PostID = ${comment_id}`)}
//                         });
//                         break;
                
//                 case "Decrement":
//                         const decrement_query = "UPDATE " + join_query + "as c " + "SET c.Likes = c.Likes - 1 WHERE c.CommentID = " + comment_id
//                         db.query(decrement_query, (err, data) => {
//                                 if (err) { return res.json(err) }
//                                 else { return res.json(`Decremented Likes for PostID = ${comment_id}`)}
//                         });
//                         break;
//         }
// });
