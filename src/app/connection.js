// App Initialization
const express = require("express")
const mysql = require("mysql2")
const cors = require("cors");
const { M_PLUS_1 } = require("next/font/google");

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
  console.log(`App connected to db! Please visit http://localhost:3307/ to see returns.`)
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

                Just because a function returns something does not mean you are required to do
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
        const PostsFetchOnID = Posts + "/FetchOnID"
        const PostsFetchLikes = Posts + "/FetchLikes"
        const PostsInsertManual = Posts + "/InsertManual"
        const PostsInsertForward = Posts + "/InsertForward"
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
                .post parameters: [Path: sr, {"PostID": int}]
                .post return: [res.json: {ReactComponentAttributes}]
        */
        app.get(PostsFetchOnID, (req, res) => {
                const post_id = req.body.PostID
                db.query(`SELECT * FROM Posts WHERE PostID = ${post_id}`, (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                return res.json(data)
                        }
                });
        });


        /*
                .post parameters: [Path: str, {"PostID": int, "UserID": int, "Content": str, "Anonymous": bool, "Username": str}]
                .post return: [res.json: {ReactComponentAttributes}]
        */
        app.post(PostsInsertManual, (req, res) => {
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
                .post parameters: [Path: str, {"UserID": int, "Content": str, "Anonymous": bool, "Username": str}]
                .post return: [res.json: {ReactComponentAttributes}]
        */
        app.post(PostsInsertForward, (req, res) => {
                const user_id = req.body.UserID
                const content = req.body.Content
                const anonymous = req.body.Anonymous
                const username = req.body.Username

                var post_id = 0
                post_id = db.query(`SELECT MAX(PostID) as Max FROM Posts`, (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                post_id = data[0].Max + 1
                                return res.json(data[Max + 1])
                        }
                });
                post_id = post_id.data

                db.query(`INSERT INTO PostLikes (UserID, PostID, Likes)
                        VALUES (${user_id}, ${post_id}, 0)`,
                (err, data) => {});

                db.query(`INSERT INTO Posts (PostID, UserID, Timestamp, Content, Anonymous, Username) 
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
                .get return: [res.json: {"Likes" : int}]
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
        const CommentsFetchOnID = Comments + "/FetchOnID"
        const CommentsInsertManual = Comments + "/InsertManual"
        const CommentsInsertForward = Comments + "/InsertForward"
        const CommentsIncrementLikes = Comments + "/IncrementLikes"
        const CommentsDecrementLikes = Comments + "/DecrementLikes"

        /*
                .get parameters: [Path: str]
                .get return: [res.json: {ReactComponentsAttributes}]
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
                .post parameters: [Path: str, {"CommentID": int}]
                .post return: [res.json: {ReactComponentAttributes}]
        */
        app.post(CommentsFetchOnID, (req, res) => {
                const comment_id = req.body.CommentID
                db.query(`SELECT * FROM Comments WHERE CommentID = ${comment_id}`, (err, data) => {
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
        app.post(CommentsInsertManual, (req, res) => {
                const comment_id = req.body.CommentID
                const user_id = req.body.UserID
                const post_id = req.body.PostID
                const content = req.body.Content
                const anonymous = req.body.Anonymous
                const username = req.body.Username
                
                var likes = 0
                db.query(`INSERT INTO CommentLikes (UserID, CommentID, Likes)
                        VALUES (${user_id}, ${comment_id}, ${likes})`,
                (err, data) => {});

                db.query(`INSERT INTO Comments (CommentID, UserID, Timestamp, PostID, Content, Anonymous, Username) 
                        VALUES (${comment_id}, ${user_id}, CURRENT_TIMESTAMP(), ${post_id}, ${content}, ${anonymous}, ${username})
                        `,
                (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                });

                db.query(`SELECT Timestamp FROM Comments WHERE CommentID = ${comment_id}`, (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                attributes = {
                                        "CommentID": comment_id,
                                        "UserID": user_id,
                                        "PostID": post_id,
                                        "Timestamp": data.Timestamp,
                                        "Content": content,
                                        "Anonymous": anonymous
                                }
                                return res.json(attributes)
                        }
                });
        });

        /*
                .post parameters: [Path: str, {"UserID": int, "PostID": int, "Content": str, "Anonymous": bool, "Username": str}]
                .post return: [res.json: {ReactComponentAttributes}]
        */
        app.post(CommentsInsertForward, (req, res) => {

                const user_id = req.body.UserID
                const post_id = req.body.PostID
                const content = req.body.Content
                const anonymous = req.body.Anonymous
                const username = req.body.Username
                
                var comment_id = 0
                db.query(`SELECT MAX(CommentID) as Max FROM Comments`, (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                comment_id = data[0].Max + 1
                        }
                });

                var likes = 0
                db.query(`INSERT INTO CommentLikes (UserID, CommentID, Likes)
                        VALUES (${user_id}, ${comment_id}, ${likes})`,
                (err, data) => {});

                db.query(`INSERT INTO Comments (CommentID, UserID, Timestamp, PostID, Content, Anonymous, Username) 
                        VALUES (${comment_id}, ${user_id}, CURRENT_TIMESTAMP(), ${post_id}, ${content}, ${anonymous}, ${username})
                        `,
                (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                });

                db.query(`SELECT Timestamp FROM Comments WHERE CommentID = ${comment_id}`, (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                attributes = {
                                        "CommentID": comment_id,
                                        "UserID": user_id,
                                        "PostID": post_id,
                                        "Timestamp": data.Timestamp,
                                        "Content": content,
                                        "Anonymous": anonymous
                                }
                                return res.json(attributes)
                        }
                });
        });


        /*
                .post parameters: [Path: str, {"CommentID": int}]
                .post return: [react.json: {int}]
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
        const UsersFetchOnID = Users + "/FetchOnID"

        const UsersInsertManual = Users + "/InsertManual"
        const UsersInsertForward = Users + "/InsertFoward"
        const UsersInsertBasic = Users + "/InsertBasic"

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
                .post parameters: [Path: str, {"UserID": int}]
                .post return: [res.json: {ReactComponentAttributes}]
        */
        app.post(UsersFetchOnID, (req, res) => {
                const user_id = req.body.UserID
                db.query(`SELECT * FROM Users WHERE CommentID = ${user_id}`, (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                return res.json(data)
                        }
                });
        });

        /*
                .post parameters: [Path: str, {"UserID": int, "Username": str, "Password": str, "Bio": str, "Email": str}]
                .post return: [res.json: {ReactComponentAttributes}]
        */
        app.post(UsersInsertManual, (req, res) => {
                const user_id = req.body.UserID
                const username = req.body.Username
                const password = req.body.Password
                const bio = req.body.Bio
                const email = req.body.Email
                db.query(`INSERT INTO Users (UserID, Username, Password, Bio, Email)
                        VALUES (${user_id}, ${username}, ${password}, ${bio}, ${email})`, 
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
                .post parameters: [Path: str, {"Username": str, "Password": str, "Bio": str, "Email": str}]
                .post return: [res.json: {ReactComponentAttributes}]
        */
        app.post(UsersInsertForward, (req, res) => {
                const username = req.body.Username
                const password = req.body.Password
                const bio = req.body.Bio
                const email = req.body.Email

                var user_id = 0
                db.query(`SELECT MAX(UserID) as Max FROM Users`, (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                user_id = data[0].Max + 1
                        }
                });

                db.query(`INSERT INTO Users (UserID, Username, Password, Bio, Email)
                        VALUES (${user_id}, ${username}, ${password}, ${bio}, ${email})`, 
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
                .post parameters: [Path: str, {"Username": str, "Password": str, "Email": str}]
                .post return: [res.json: {""}]
        */
        app.post(UsersInsertBasic, (req, res) => {
                const username = req.body.Username
                const password = req.body.Password
                const email = req.body.Email

                var user_id = 0
                db.query(`SELECT MAX(UserID) as Max FROM Users`, (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                user_id = data[0].Max + 1
                        }
                });

                db.query(`INSERT INTO Users (UserID, Username, Password, Bio, Email)
                        VALUES (${user_id}, ${username}, ${password}, ${bio}, ${email})`, 
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
                .post return: [res.json(): {"Username": str}]
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
                .post return: [res.json(): {"Password": str}]
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
                .post return: [res.json(): {"Bio": str}]
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
                .post return: [res.json(): {"Email": str}]
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
                .post return: [res.json: str]
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
                                return res.json(username)
                        }
                });
        });


        /*
                .post parameters: [Path: str, {"UserID" : str, "Password" : str}]
                .post return: [res.json: str]
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
                                return res.json(password)
                        }
                });
        });


        /*
                .post parameters: [Path: str, {"UserID": str, "Bio": str]
                .post return: [return.json: str]
        */
        app.post(UsersChangeBio, (req, res) => {
                const user_id = req.body.UserID
                const bio = req.body.Bio
                db.query(`UPDATE Users 
                        SET Bio = ${bio}
                        WHERE UserID = ${user_id}`,
                (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                return res.json(bio)
                        }
                });
        });


        /*
                .post parameters: [Path: str, {"user_id": str, "email": str}]
                .post return: [return.json: str]
        */
        app.post(UsersChangeEmail, (req, res) => {
                const user_id = req.body.UserID
                const email = req.body.Email
                db.query(`UPDATE Users 
                        SET Email = ${email}
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




/*
 ------------------------- EXPERIMENTATION PLAYGOUND -------------------------
*/

        /*
                .post parameters: [Path: str, {"PostBody": str}]
        */
        // app.post("/Example", (req, res) => {
        //         const user_id = req.body.PostBody
        //         // const email = req.body[1]

        //         // const value = {user_id, email}
        //         // const data = {"user_id": user_id}

        //         db.query(`SELECT MAX(PostID) as max FROM Posts`, (err, data) => {
        //                 if (err) {
        //                         return res.json(err)
        //                 } 
        //                 else {
        //                         const max_post_id = data[0]
        //                         return res.json(max_post_id.max)
        //                 }
        //         });
        //         // return res.json(user_id)
        // })

        // app.post("/Example", (req, res) => {
        //         const user_id = req.body.PostBody
        //         // const email = req.body[1]

        //         // const value = {user_id, email}
        //         // const data = {"user_id": user_id}

        //         db.query(`SELECT Likes FROM PostLikes WHERE PostID = 3`, (err, data) => {
        //                 if (err) {
        //                         return res.json(err)
        //                 } 
        //                 else {
        //                         return res.json(data)
        //                 }
        //         });
        //         // return res.json(user_id)
        // })

        // app.post("/Example", (req, res) => {
        //         const value = 3
        //         db.query(`UPDATE PostLikes
        //                 SET Likes = Likes + 1 
        //                 WHERE PostID = ${value}`,
        //         (err, data) => {
        //                 if (err) {
        //                         return res.json(err)
        //                 }
        //                 else {
        //                         return res.json(value + 1)
        //                 }

        //         });
        // });

        /*
                .post parameters: [Path: str, {"Username": str, "Password": str, "Bio": str, "Email": str}]
                .post return: [res.json: {ReactComponentAttributes}]
        */
        // app.post("/Example", (req, res) => {
        //         const username = req.body.Username
        //         const password = req.body.Password
        //         const bio = req.body.Bio
        //         const email = req.body.Email

        //         let user_id = 0
        //         var data_q= 0
        //         user_id = db.query(`SELECT MAX(UserID) as Max FROM Users`, (err, data) => {
        //                 if (err) {
        //                         return res.json(err)
        //                 }
        //                 else {
        //                         // user_id = data[0]
        //                         data_q = data
        //                         user_id = data[0].Max + 1
        //                         return res.json(data[0].Max + 1)
        //                         // return res.json(data[0].Max + 1)
        //                 }
        //         });
        //         // return res.json(data_q[0].Max + 1)
        //         return user_id

        //         // db.query(`INSERT INTO Users (UserID, Username, Password, Bio, Email)
        //         //         VALUES (${user_id}, ${username}, ${password}, ${bio}, ${email})`, 
        //         // (err, data) => {
        //         //         if (err) {
        //         //                 return res.json(err)
        //         //         }
        //         //         else {
        //         //                 return res.json(data)
        //         //         }
        //         // });
        // });

        app.post("/Example", (req, res) => {
                const user_id = req.body.UserID
                const content = req.body.Content
                const anonymous = req.body.Anonymous
                const username = req.body.Username

                var post_id = 0
                post_id = db.query(``, (err, data) => {
                        if (err) {
                                res.json(err)
                        }
                        else {
                                post_id = data[0].Max + 1
                                res.json(data[0].Max + 1)
                        }
                });

                db.query(`INSERT INTO PostLikes (UserID, (), Likes)
                        VALUES (${user_id}, ${post_id}, 0)`,
                (err, data) => {});

                db.query(`INSERT INTO Posts (PostID, UserID, Timestamp, Content, Anonymous, Username) 
                        VALUES (${post_id}, ${user_id}, CURRENT_TIMESTAMP(), ${content}, ${anonymous}, ${username})
                        `,
                (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                attributes = {
                                        "PostID": post_id,
                                        "UserID": user_id,
                                        "Content": content,
                                        "Anonymous": anonymous
                                }
                                return res.json(attributes)
                        }
                });
        });