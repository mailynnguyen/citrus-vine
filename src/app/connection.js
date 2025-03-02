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

        /*
                If exportable, will have the benefit of just stating a variable's
                name in all other functions.
        */
        const Posts = "/Posts"
        const PostsFetchAll = Posts + "/Fetch"
        const PostsIncrementLikes = Posts + "/IncrementLikes"
        const PostsDecrementLikes = Posts = "/DecrementLikes"

        const Comments = "/Comments"
        const CommentsFetchAll = Comments + "/Fetch"
        const CommentsIncrementLikes = Comments + "/IncrementLikes"
        const CommentsDecrementLikes = Comments + "/DecrementLikes"


// Posts

        /*
                Requires no parameters besides path.
        */
        app.get(PostsFetchAll, (req, res) => {
                db.query("SELECT * FROM Posts", (err, data) => {
                        if (err) {
                                result = res.json(err)
                        }
                        else {
                                result = res.json(data)
                        }
                });
                return result;

        });

        /*
                Requires React Component: Path
        */
        app.post(PostsIncrementLikes, (req, res) => {
                const value = req.body.PostID
                db.query(`UPDATE PostLikes
                         SET Likes = (SELECT Likes From PostLikes WHERE PostID = ${value}) + 1 
                         WHERE PostID = ${value}`,
                (err, data) => {});
        });
        app.post(PostsDecrementLikes, (req, res) => {
                const value = req.body.PostID
                db.query(`UPDATE PostLikes
                         SET Likes = (SELECT Likes From PostLikes WHERE PostID = ${value}) - 1 
                         WHERE PostID = ${value}`,
                (err, data) => {});
        });


// Comments

        /*
                Requires no parameters besides path.
        */
        app.get(CommentsFetchAll, (req, res) => {
                db.query("SELECT * FROM Comments", (err, data) => {
                        if (err) {
                                result = res.json(err)
                        }
                        else {
                                result = res.json(data)
                        }
                });
                return result;

        });

        /*
                Requires React Component: Path
        */
        app.post(CommentsIncrementLikes, (req, res) => {
                const value = req.body.CommentID
                db.query(`UPDATE CommentLikes
                                SET Likes = (SELECT Likes From CommentLikes WHERE CommentID = ${value}) + 1 
                                WHERE CommentId = ${value}`,
                (err, data) => {});
        });
        app.post(CommentsDecrementLikes, (req, res) => {
                const value = req.body.CommentID
                db.query(`UPDATE CommentLikes
                                SET Likes = (SELECT Likes From CommentLikes WHERE CommentID = ${value}) - 1 
                                WHERE CommentId = ${value}`,
                (err, data) => {});
        });






