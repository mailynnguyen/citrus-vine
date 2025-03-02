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
      


/*
        NOTES:

        Please read the following before using the functions.

        For simplicity, most of these functions return a .json file. Even functions that simply 
        perform updates return values.
        
        The choice behind this styling is because I'm expecting that there's a lot of updates
        to ReactComponentAttributes. ReactComponentAttributres are the variables that are 
        declared with "useState". The idea is that once you perform an express call, you are 
        setting that "useState" variable to the data of the express call.

        This may lead to some security risks in reality, so here's an 
        important note:

                Just because a function is of type .get does not mean you are required to do
                anything with the returned data.

        All of these express calls return .json types. That means if you need to specify what
        the data you want when this json is returned. This requires close attention to return
        type of these functions.

        IMPORTANT: Please look at src/app/express-tutorial.txt for a real example on how to use
        these functions.
*/



const Prior = ""

/*
------------------------- POSTS -------------------------
*/

        /*
                Options
        */
        const Posts = Prior + "/Posts"
        const PostsFetchAll = Posts + "/FetchAll"
        const PostsInsert = Posts + "/Insert"
        const PostsFetchLikes = Posts + "/FetchLikes"
        const PostsIncrementLikes = Posts + "/IncrementLikes"
        const PostsDecrementLikes = Posts + "/DecrementLikes"


        /*
                .get parameters: [path: str] 
                .get return: [res.json: {ReactComponentsAttributes}]
        */
        app.get(PostsFetchAll, (req, res) => {
                var result;
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
                .post parameters: [Path: str, {"PostID": int, "UserID": int, "Content": str, "Anonymous": bool, "Username": str}]
                .post return: [res.json: {ReactComponentAttributes}]
        */
        app.post(PostsInsert, (req, res) => {
                const post_id = req.body.PostID
                const user_id = req.body.UserID
                const content = req.body.Content
                const anonymous = req.body.Anonymous
                const username = req.body.Username

                db.query(`INSERT INTO PostLikes (UserID, PostID, Likes)
                        VALUES (${user_id}, ${post_id}, 0)`,
                (err, data) => {});

                db.query(`INSERT INTO CitrusVineDB_oxygenbend.Posts (PostID, UserID, Timestamp, Content, Anonymous, Username) 
                        VALUES (${post_id}, ${user_id}, CURRENT_TIMESTAMP(), ${content}, ${anonymous}, ${username})
                        `,
                (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                attributes = {
                                        "PostID": comment_id,
                                        "UserID": user_id,
                                        "Content": content,
                                        "Anonymous": anonymous
                                }
                                return res.json(attributes)
                        }
                });
        });


        /*
                .get parameters: [path: str, {"PostID": int}]
                .get return: [res.json: {int}]
        */
        app.post(PostsFetchLikes, (req, res) => {
                const post_id = req.body.PostID
                db.query(`SELECT Likes 
                        FROM PostLikes 
                        WHERE PostID = ${post_id}`, 
                (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                return res.json(data)
                        }
                });

        });


        /*
                .post parameters: [path: str, {"PostID": int}]
                .post return: [res.json: {int}]
        */
        app.post(PostsIncrementLikes, (req, res) => {
                const value = req.body.PostID
                db.query(`UPDATE PostLikes
                                SET Likes = Likes + 1 
                                FROM Posts
                                WHERE PostID = ${value}`,
                (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                return res.json(value + 1)
                        }
                });
        });
        app.post(PostsDecrementLikes, (req, res) => {
                const value = req.body.PostID
                db.query(`UPDATE PostLikes
                                SET Likes = Likes - 1 
                                FROM Posts
                                WHERE PostID = ${value}`,
                (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                return res.json(value - 1)
                        }
                });
        });



/*
------------------------- COMMENTS -------------------------
*/
        /*
                Options
        */
        const Comments = Prior + "/Comments"
        const CommentsFetchAll = Comments + "/Fetch"
        const CommentsInsert = Comments + "/Insert"
        const CommentsIncrementLikes = Comments + "/IncrementLikes"
        const CommentsDecrementLikes = Comments + "/DecrementLikes"

        /*
                .get parameters: [Path: str]
                .get return: [res.json: {ReactComponentAttributes}]
        */
        app.get(CommentsFetchAll, (req, res) => {
                db.query("SELECT * FROM Comments", (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                return res.json(data)
                        }
                });
        });

        
        /*
                .post parameters: [Path: str, {"CommentID": int, "UserID": int, "PostID": int, "Content": str, "Anonymous": bool, "Username": str}]
                .post return: [res.json: {ReactComponentAttributes}]
        */
        app.post(CommentsInsert, (req, res) => {
                const comment_id = req.body.CommentID
                const user_id = req.body.UserID
                const post_id = req.body.PostID
                const content = req.body.Content
                const anonymous = req.body.Anonymous
                const username = req.body.Username
                db.query(`INSERT INTO Comments (CommentID, UserID, Timestamp, PostID, Content, Anonymous, Username) 
                        VALUES (${comment_id}, ${user_id}, CURRENT_TIMESTAMP(), ${post_id}, ${content}, ${anonymous}, ${username})
                        `,
                (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                attributes = {
                                        "CommentID": comment_id,
                                        "UserID": user_id,
                                        "PostID": post_id,
                                        "Content": content,
                                        "Anonymous": anonymous
                                }
                                return res.json(attributes)
                        }
                });
        });


        /*
                .post parameters: [Path: str, {"CommentID": int}]
                .post return: [react.json: numer_likes: {int}]
        */
        app.post(CommentsIncrementLikes, (req, res) => {
                const value = req.body.number_likes
                db.query(`UPDATE CommentLikes
                        SET Likes = Likes + 1
                        WHERE CommentId = ${value}`,
                (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                return res.json(value + 1)
                        }
                });
        });
        app.post(CommentsDecrementLikes, (req, res) => {
                const value = req.body.number_likes
                db.query(`UPDATE CommentLikes
                        SET Likes = Likes - 1 
                        WHERE CommentId = ${value}`,
                (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                return res.json(value - 1)
                        }
                });
        });


/*
------------------------- USERS -------------------------
*/

        /*
                Options
        */
        const Users = Prior + "/Users"
        const UsersFetchAll = Users + "/FetchAll"

        const UsersGetUsername = Users + "/GetUsername"
        const UsersGetPassword = Users + "/GetPassword"
        const UsersGetBio = Users + "/GetBio"
        const UsersGetEmail = Users + "/GetEmail"

        const UsersChangeUsername = Users + "/ChangeUsername"
        const UsersChangePassword = Users + "/ChangePassword"
        const UsersChangeBio = Users + "/ChangeBio"
        const UsersChangeEmail = Users + "/ChangeEmail"

        /*
                .get parameters: [Path: str]
                .get return: [res.json: {ReactComponentsAttributes}]
        */
        app.get(UsersFetchAll, (req, res) => {
                db.query("SELECT * FROM Users", (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                return res.json(data)
                        }
                });
        });


        /*
                .post parameters: [Path: str, {"UserID": str}]
                .post return: [res.json(): str]
        */
        app.post(UsersGetUsername, (req, res) => {
                const user_id = req.body.UserID
                db.query(`SELECT Username
                        FROM Users 
                        WHERE UserID = ${user_id}`,
                (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                return res.json(data)
                        }
                });
        });


        /*
                .post parameters: [Path: str, {"UserID": str}]
                .post return: [res.json(): str]
        */
                app.post(UsersGetPassword, (req, res) => {
                        const user_id = req.body.UserID
                        db.query(`SELECT Password
                                FROM Users 
                                WHERE UserID = ${user_id}`,
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        });
                });


        /*
                .post parameters: [Path: str, {"UserID": str}]
                .post return: [res.json(): str]
        */
                app.post(UsersGetBio, (req, res) => {
                        const user_id = req.body.UserID
                        db.query(`SELECT Bio
                                FROM Users 
                                WHERE UserID = ${user_id}`,
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        });
                });


        /*
                .post parameters: [Path: str, {"UserEmail": str}]
                .post return: [res.json(): {str}]
        */
                app.post(UsersGetEmail, (req, res) => {
                        const user_id = req.body.UserEmail
                        db.query(`SELECT Email
                                FROM Users 
                                WHERE UserID = ${user_id}`,
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        });
                });


        /*
                .post parameters: [Path: str, {"UserID" : str, "Username" : str}]
                .post return: [res.json: {str}]
        */
        app.post(UsersChangeUsername, (req, res) => {
                const user_id = req.body.UserID
                const username = req.body.Use
                db.query(`UPDATE Users 
                        SET Username = ${username}
                        WHERE UserID = ${user_id}`,
                (err, data) => {
                        if (err) {
                                return res.json(err)
                        } 
                        else {
                                return res.json(data)
                        }
                });
        });


        /*
                .post parameters: [Path: str, {"UserID" : str, "Password" : str}]
                .post return: [res.json: {str}]
        */
        app.post(UsersChangePassword, (req, res) => {
                const user_id = req.body.UserID
                const password = req.body.Password
                db.query(`UPDATE Users 
                        SET Password = ${password}
                        WHERE UserID = ${user_id}`,
                (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                return res.json(data)
                        }
                });
        });


        /*
                .post parameters: [Path: str, {"UserID": str, "Bio": str]
                .post return: [return.json: {str}]
        */
        app.post(UsersChangeBio, (req, res) => {
                const user_id = req.body.UserID
                const password = req.body.Bio
                db.query(`UPDATE Users 
                        SET Bio = ${password}
                        WHERE UserID = ${user_id}`,
                (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                return res.json(data)
                        }
                });
        });


        /*
                .post parameters: [Path: str, {"user_id": str, "email": str}]
                .post return: [return.json: {str}]
        */
        app.post(UsersChangeEmail, (req, res) => {
                const user_id = req.body.UserID
                const email = req.body.Email
                db.query(`UPDATE Users 
                        SET Email = ${username}
                        WHERE UserID = ${user_id}`,
                (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                return res.json(email)
                        }
                });
        });

        app.post("/Example", (req, res) => {
                const user_id = req.body[0]
                // const email = req.body[1]

                // const value = {user_id, email}
                const data = {"user_id": user_id}
                return res.json(user_id)
        })



