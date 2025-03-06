// App Initialization
const express = require("express")
const mysql = require("mysql2")
const cors = require("cors");
// const promise = require("mysql2/promise")
const { M_PLUS_1 } = require("next/font/google");
//const { DatabaseBackup } = require("lucide-react");

const app = express()
app.use(cors());
app.use(express.json());
// app.use(promise());


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

// db.query("SELECT 1+1").on("result", function (row) {
//   console.log(row);
// });

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
                const PostsFetch10 = Posts + "/Fetch10"
                const PostsFetchAscLikes = Posts + "/FetchAscLikes"
                const PostsFetchDescLikes = Posts + "/FetchDescLikes"
                const PostsFetchAscTimestamp = Posts + "/FetchOnAscTimestamp"
                const PostsFetch10AscTimestamp = Posts + "/Fetch10AscTimestamp"
                const PostsFetchDescTimestamp = Posts + "/FetchOnDescTimestamp"

                const PostsFetchOnPostID = Posts + "/FetchOnPostID"
                const PostsFetchOnUserID = Posts + "/FetchOnUserID"
                const PostsFetchOnUsername = Posts + "/FetchOnUsername"
                const PostsFetchAscTimestampOnUserID = Posts + "/FetchOnAscTimestampOnUserID"
                const PostsFetchDescTimestampOnUserID = Posts + "/FetchOnDescTimestampOnUserID"
                const PostsFetchAscLikesOnUserID = Posts + "/FetchOnAscLikesOnUserID"
                const PostsFetchDescLikesOnUserID = Posts + "/FetchOnDescLikesOnUserID"

                const PostsGetLikes = Posts + "/FetchLikes"

                const PostsInsertManual = Posts + "/InsertManual"
                const PostsInsertForward = Posts + "/InsertForward"

                const PostsIncrementLikes = Posts + "/IncrementLikes"
                const PostsDecrementLikes = Posts + "/DecrementLikes"

                const PostDeleteOnPostID = Posts + "/DeleteOnPostID"

        /*
                .get parameters: [path: str] 
                .get return: ARRAY[{"PostID": int, "UserID": int, "Timestamp": str, "Content": str, "Anonymous": bool, "Username": str, "Likes": int, "CommentCount": int]
        */
        app.get(PostsFetchAll, (req, res) => {
                db.query(`
                        SELECT A.PostID, A.UserID, A.Timestamp, A.Content, A.Anonymous, A.Username, 
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes, 
                        CASE WHEN CommentCount IS NULL THEN 0 ELSE CommentCount END AS CommentCount
                        FROM Posts A
                        LEFT JOIN (SELECT C.PostID, COUNT(*) as CommentCount FROM Comments C GROUP BY C.PostID) as C ON A.PostID = C.PostID 
                        LEFT JOIN PostLikes B ON A.PostID = B.PostID
                        `, 
                        
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
                .get parameters: [path: str] 
                .get return: ARRAY[{"PostID": int, "UserID": int, "Timestamp": str, "Content": str, "Anonymous": bool, "Username": str, "Likes": int, "CommentCount": int]
        */
        app.get(PostsFetch10, (req, res) => {

                const offset = (req.query.page - 1) * 10
                db.query(`
                        SELECT A.PostID, A.UserID, A.Timestamp, A.Content, A.Anonymous, A.Username, 
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes, 
                        CASE WHEN CommentCount IS NULL THEN 0 ELSE CommentCount END AS CommentCount
                        FROM Posts A
                        LEFT JOIN (SELECT C.PostID, COUNT(*) as CommentCount FROM Comments C GROUP BY C.PostID) as C ON A.PostID = C.PostID 
                        LEFT JOIN PostLikes B ON A.PostID = B.PostID
                        ORDER BY A.Timestamp DESC
                        LIMIT 10 OFFSET ${offset}
                        `, 
                        
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
                .get parameters: [Path: str]
                .get return: ARRAY[{"PostID": int, "UserID": int, "Timestamp": str, "Content": str, "Anonymous": bool, "Username": str, "Likes": int, "CommentCount": int]
        */
        app.get(PostsFetchAscLikes, (req, res) => {
                db.query(`
                        SELECT A.PostID, A.UserID, A.Timestamp, A.Content, A.Anonymous, A.Username, 
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes, 
                        CASE WHEN CommentCount IS NULL THEN 0 ELSE CommentCount END AS CommentCount
                        FROM Posts A
                        LEFT JOIN (SELECT C.PostID, COUNT(*) as CommentCount FROM Comments C GROUP BY C.PostID) as C ON A.PostID = C.PostID 
                        LEFT JOIN PostLikes B ON A.PostID = B.PostID
                        ORDER BY Likes ASC
                        `), 
                
                (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                return res.json(data)
                        }
                }
        });
        

        /* 
                .get parameters: [Path: str]
                .get return: ARRAY[{"PostID": int, "UserID": int, "Timestamp": str, "Content": str, "Anonymous": bool, "Username": str, "Likes": int, "CommentCount": int]
        */
        app.get(PostsFetchDescLikes, (req, res) => {
                db.query(`
                        SELECT A.PostID, A.UserID, A.Timestamp, A.Content, A.Anonymous, A.Username, 
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes, 
                        CASE WHEN CommentCount IS NULL THEN 0 ELSE CommentCount END AS CommentCount
                        FROM Posts A
                        LEFT JOIN (SELECT C.PostID, COUNT(*) as CommentCount FROM Comments C GROUP BY C.PostID) as C ON A.PostID = C.PostID 
                        LEFT JOIN PostLikes B ON A.PostID = B.PostID
                        ORDER BY Likes DESC
                        `), 
                
                (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                return res.json(data)
                        }
                }
        });


        /*
                .get parameters: [Path: str]
                .get return: ARRAY[{"PostID": int, "UserID": int, "Timestamp": str, "Content": str, "Anonymous": bool, "Username": str, "Likes": int, "CommentCount": int]
        */
        app.get(PostsFetchAscTimestamp, (req, res) => {
                db.query(`
                        SELECT A.PostID, A.UserID, A.Timestamp, A.Content, A.Anonymous, A.Username, 
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes, 
                        CASE WHEN CommentCount IS NULL THEN 0 ELSE CommentCount END AS CommentCount
                        FROM Posts A
                        LEFT JOIN (SELECT C.PostID, COUNT(*) as CommentCount FROM Comments C GROUP BY C.PostID) as C ON A.PostID = C.PostID 
                        LEFT JOIN PostLikes B ON A.PostID = B.PostID
                        ORDER BY A.Timestamp ASC
                        `, 
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });


        /*
                .get parameters: [Path: str]
                .get return: ARRAY[{"PostID": int, "UserID": int, "Timestamp": str, "Content": str, "Anonymous": bool, "Username": str, "Likes": int, "CommentCount": int]
        */
        app.get(PostsFetchDescTimestamp, (req, res) => {
                db.query(`
                        SELECT A.PostID, A.UserID, A.Timestamp, A.Content, A.Anonymous, A.Username, 
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes, 
                        CASE WHEN CommentCount IS NULL THEN 0 ELSE CommentCount END AS CommentCount
                        FROM Posts A
                        LEFT JOIN (SELECT C.PostID, COUNT(*) as CommentCount FROM Comments C GROUP BY C.PostID) as C ON A.PostID = C.PostID 
                        LEFT JOIN PostLikes B ON A.PostID = B.PostID
                        ORDER BY A.Timestamp DESC
                        `, 
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });



        /*
                .get parameters: [Path: str]
                .get return: ARRAY[{"PostID": int, "UserID": int, "Timestamp": str, "Content": str, "Anonymous": bool, "Username": str, "Likes": int, "CommentCount": int]
        */
        app.get(PostsFetch10AscTimestamp, (req, res) => {
                const offset = (req.query.page - 1) * 10
                db.query(`
                        SELECT A.PostID, A.UserID, A.Timestamp, A.Content, A.Anonymous, A.Username, 
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes, 
                        CASE WHEN CommentCount IS NULL THEN 0 ELSE CommentCount END AS CommentCount
                        FROM Posts A
                        LEFT JOIN (SELECT C.PostID, COUNT(*) as CommentCount FROM Comments C GROUP BY C.PostID) as C ON A.PostID = C.PostID 
                        LEFT JOIN PostLikes B ON A.PostID = B.PostID
                        ORDER BY A.Timestamp ASC
                        LIMIT 10 OFFSET ${offset}
                        `, 
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });


        /*
                .post parameters: [Path: str, {"PostID": int}]
                .get return: ARRAY[{"PostID": int, "UserID": int, "Timestamp": str, "Content": str, "Anonymous": bool, "Username": str, "Likes": int, "CommentCount": int]
        */
        app.post(PostsFetchOnPostID, (req, res) => {
                const post_id = req.body.PostID
                db.query(`
                        SELECT A.PostID, A.UserID, A.Timestamp, A.Content, A.Anonymous, A.Username, 
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes, 
                        CASE WHEN CommentCount IS NULL THEN 0 ELSE CommentCount END AS CommentCount
                        FROM Posts A
                        LEFT JOIN (SELECT C.PostID, COUNT(*) as CommentCount FROM Comments C GROUP BY C.PostID) as C ON A.PostID = C.PostID 
                        LEFT JOIN PostLikes B ON A.PostID = B.PostID
                        WHERE A.PostID = ${post_id}`,
                        
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
                .post parameters: [Path: str, {"UserID": int}]
                .get return: ARRAY[{"PostID": int, "UserID": int, "Timestamp": str, "Content": str, "Anonymous": bool, "Username": str, "Likes": int, "CommentCount": int]
        */
        app.post(PostsFetchOnUserID, (req, res) => {
                const user_id = req.body.UserID
                db.query(`
                        SELECT A.PostID, A.UserID, A.Timestamp, A.Content, A.Anonymous, A.Username, 
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes, 
                        CASE WHEN CommentCount IS NULL THEN 0 ELSE CommentCount END AS CommentCount
                        FROM Posts A
                        LEFT JOIN (SELECT C.PostID, COUNT(*) as CommentCount FROM Comments C GROUP BY C.PostID) as C ON A.PostID = C.PostID 
                        LEFT JOIN PostLikes B ON A.PostID = B.PostID
                        WHERE A.UserID = ${user_id}`,
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });


        /*
                .post parameters: [Path: str, {"Username": int}]
                .get return: ARRAY[{"PostID": int, "UserID": int, "Timestamp": str, "Content": str, "Anonymous": bool, "Username": str, "Likes": int, "CommentCount": int]
        */
        app.post(PostsFetchOnUsername, (req, res) => {
                const username = req.body.Username
                db.query(`
                        SELECT A.PostID, A.UserID, A.Timestamp, A.Content, A.Anonymous, A.Username, 
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes, 
                        CASE WHEN CommentCount IS NULL THEN 0 ELSE CommentCount END AS CommentCount
                        FROM Posts A
                        LEFT JOIN (SELECT C.PostID, COUNT(*) as CommentCount FROM Comments C GROUP BY C.PostID) as C ON A.PostID = C.PostID 
                        LEFT JOIN PostLikes B ON A.PostID = B.PostID
                        WHERE A.Username = ${username}`,
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });


        /*
                .post parameters: [Path: str, {"UserID": int}]
                .get return: ARRAY[{"PostID": int, "UserID": int, "Timestamp": str, "Content": str, "Anonymous": bool, "Username": str, "Likes": int, "CommentCount": int]
        */
        app.post(PostsFetchAscTimestampOnUserID, (req, res) => {
                const user_id = req.body.UserID
                db.query(`
                        SELECT A.PostID, A.UserID, A.Timestamp, A.Content, A.Anonymous, A.Username, 
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes, 
                        CASE WHEN CommentCount IS NULL THEN 0 ELSE CommentCount END AS CommentCount
                        FROM Posts A
                        LEFT JOIN (SELECT C.PostID, COUNT(*) as CommentCount FROM Comments C GROUP BY C.PostID) as C ON A.PostID = C.PostID 
                        LEFT JOIN PostLikes B ON A.PostID = B.PostID
                        WHERE A.UserID = ${user_id}
                        ORDER BY A.Timestamp ASC
                        `,
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });


        /*
                .post parameters: [Path: str, {"UserID": int}]
                .get return: ARRAY[{"PostID": int, "UserID": int, "Timestamp": str, "Content": str, "Anonymous": bool, "Username": str, "Likes": int, "CommentCount": int]
        */
        app.post(PostsFetchDescTimestampOnUserID, (req, res) => {
                const user_id = req.body.UserID
                db.query(`
                        SELECT A.PostID, A.UserID, A.Timestamp, A.Content, A.Anonymous, A.Username, 
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes, 
                        CASE WHEN CommentCount IS NULL THEN 0 ELSE CommentCount END AS CommentCount
                        FROM Posts A
                        LEFT JOIN (SELECT C.PostID, COUNT(*) as CommentCount FROM Comments C GROUP BY C.PostID) as C ON A.PostID = C.PostID 
                        LEFT JOIN PostLikes B ON A.PostID = B.PostID
                        WHERE A.UserID = ${user_id}
                        ORDER BY A.Timestamp DESC
                        `,
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });


        /*
                .post parameters: [Path: str, {"UserID": int}]
                .get return: ARRAY[{"PostID": int, "UserID": int, "Timestamp": str, "Content": str, "Anonymous": bool, "Username": str, "Likes": int, "CommentCount": int]
        */
        app.post(PostsFetchAscLikesOnUserID, (req, res) => {
                const user_id = req.body.UserID
                db.query(`
                        SELECT A.PostID, A.UserID, A.Timestamp, A.Content, A.Anonymous, A.Username, 
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes, 
                        CASE WHEN CommentCount IS NULL THEN 0 ELSE CommentCount END AS CommentCount
                        FROM Posts A
                        LEFT JOIN (SELECT C.PostID, COUNT(*) as CommentCount FROM Comments C GROUP BY C.PostID) as C ON A.PostID = C.PostID 
                        LEFT JOIN PostLikes B ON A.PostID = B.PostID
                        WHERE A.UserID = ${user_id}
                        ORDER BY Likes ASC
                        `,
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });


        /*
                .post parameters: [Path: str, {"UserID": int}]
                .get return: ARRAY[{"PostID": int, "UserID": int, "Timestamp": str, "Content": str, "Anonymous": bool, "Username": str, "Likes": int, "CommentCount": int]
        */
        app.post(PostsFetchDescLikesOnUserID, (req, res) => {
                const user_id = req.body.UserID
                db.query(`
                        SELECT A.PostID, A.UserID, A.Timestamp, A.Content, A.Anonymous, A.Username, 
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes, 
                        CASE WHEN CommentCount IS NULL THEN 0 ELSE CommentCount END AS CommentCount
                        FROM Posts A
                        LEFT JOIN (SELECT C.PostID, COUNT(*) as CommentCount FROM Comments C GROUP BY C.PostID) as C ON A.PostID = C.PostID 
                        LEFT JOIN PostLikes B ON A.PostID = B.PostID
                        WHERE A.UserID = ${user_id}
                        ORDER BY Likes DESC
                        `,
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });


        /*
                .post parameters: [Path: str, {"PostID": int, "UserID": int, "Content": str, "Anonymous": bool, "Username": str}]
                .get return: [{"PostID": int, "UserID": int, "Timestamp": str, "Content": str, "Anonymous": bool, "Username": str, "Likes": int, "CommentCount": int]
        */
        app.post(PostsInsertManual, (req, res) => {
                const post_id = req.body.PostID
                const user_id = req.body.UserID
                const content = req.body.Content
                const anonymous = req.body.Anonymous
                const username = req.body.Username

                db.query(`
                        INSERT INTO PostLikes (UserID, PostID, Likes)
                        VALUES (
                                ${user_id}, 
                                ${post_id}, 
                                0
                        )`,

                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                        }
                );

                db.query(`
                        INSERT INTO Posts (PostID, UserID, Timestamp, Content, Anonymous, Username) 
                        VALUES (
                                ${post_id}, 
                                ${user_id}, 
                                CURRENT_TIMESTAMP(), 
                                ${content}, 
                                ${anonymous}, 
                                ${username}
                        )`,

                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                        }
                );

                db.query(`
                        SELECT A.PostID, A.UserID, A.Timestamp, A.Content, A.Anonymous, A.Username, 
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes, 
                        CASE WHEN CommentCount IS NULL THEN 0 ELSE CommentCount END AS CommentCount
                        FROM Posts A
                        LEFT JOIN (SELECT C.PostID, COUNT(*) as CommentCount FROM Comments C GROUP BY C.PostID) as C ON A.PostID = C.PostID 
                        LEFT JOIN PostLikes B ON A.PostID = B.PostID
                        WHERE A.PostID = ${post_id}
                        `,

                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                } 
                                else {
                                        return res.json(data)
                                }
                        }
                )
        });


        /*
                .post parameters: [Path: str, {"UserID": int, "Content": str, "Anonymous": bool, "Username": str}]
                .get return: [{"PostID": int, "UserID": int, "Timestamp": str, "Content": str, "Anonymous": bool, "Username": str, "Likes": int, "CommentCount": int]
        */
        app.post(PostsInsertForward, (req, res) => {
                const user_id = req.body.UserID
                const content = req.body.Content
                const anonymous = req.body.Anonymous
                const username = req.body.Username
                
                db.query(`
                        INSERT INTO Posts (PostID, UserID, Timestamp, Content, Anonymous, Username) 
                        VALUES (
                                (SELECT MAX(A.PostID) + 1 FROM Posts A), 
                                ${user_id}, 
                                CURRENT_TIMESTAMP(), 
                                '${content}', 
                                ${anonymous}, 
                                '${username}'
                        )`,

                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                        }
                );
                db.query(`
                        INSERT INTO PostLikes (UserID, PostID, Likes)
                        VALUES (
                                ${user_id}, 
                                (SELECT MAX(A.PostID) FROM Posts A), 
                                0
                        )`,

                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                        }
                );
                db.query(`
                        SELECT A.PostID, A.UserID, A.Timestamp, A.Content, A.Anonymous, A.Username, 
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes, 
                        CASE WHEN CommentCount IS NULL THEN 0 ELSE CommentCount END AS CommentCount
                        FROM Posts A
                        LEFT JOIN (SELECT C.PostID, COUNT(*) as CommentCount FROM Comments C GROUP BY C.PostID) as C ON A.PostID = C.PostID 
                        LEFT JOIN PostLikes B ON A.PostID = B.PostID
                        WHERE A.PostID = (SELECT MAX(PostID) FROM Posts)
                        `,
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                )
        });


        /*
                .get parameters: [path: str, {"PostID": int}]
                .get return: [{"Likes" : int}]
        */
        app.post(PostsGetLikes, (req, res) => {
                const post_id = req.body.PostID
                db.query(`
                        SELECT COUNT(*)
                        FROM PostLikes
                        WHERE PostID = ${post_id}
                        `,
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
                .post parameters: [path: str, {"UserID": int, "PostID": int}]
                .post return: [{"NumLikes": int}]
        */
        app.post(PostsIncrementLikes, (req, res) => {
                const user_id = req.body.UserID
                const post_id = req.body.PostID
                db.query(` 
                        INSERT PostLikes (UserID, PostID, Likes)
                        VALUES (${user_id}, ${post_id}, 1)
                        `,

                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        db.query(`
                                                SELECT COUNT(*) as NumLikes
                                                FROM PostLikes
                                                WHERE PostID = ${post_id}
                                                AND Likes = 1
                                                `,
                                                
                                                (err, data) => {
                                                        if (err) {
                                                                return res.json
                                                        }
                                                        else {
                                                                return res.json(data)
                                                        }
                                                }
                                        
                                        );
                                }
                        }
                );
        });
        app.post(PostsDecrementLikes, (req, res) => {
                const user_id = req.body.UserID
                const post_id = req.body.PostID
                db.query(` 
                        DELETE PostLikes 
                        WHERE UserID = ${user_id} AND PostID = ${post_id}
                        `,

                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        db.query(`
                                                SELECT COUNT(*) as NumLikes
                                                FROM PostLikes
                                                WHERE PostID = ${post_id}
                                                AND Likes = 1
                                                `,
                                                
                                                (err, data) => {
                                                        if (err) {
                                                                return res.json
                                                        }
                                                        else {
                                                                return res.json(data)
                                                        }
                                                }
                                        
                                        );
                                }
                        }
                );
        });


        /*
                .post parameters: [Path: str, "PostID": str}]
                .get return: ["Outcome": bool]
        */
        app.post(PostDeleteOnPostID, (res, data) => {
                const post_id = res.body.PostID
                db.query(`
                        DELETE FROM Posts
                        WHERE PostID = ${post_id}
                        `,

                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                        }
                )
                db.query(`
                        DELETE FROM PostsLikes
                        WHERE PostID = ${post_id}
                        `,

                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                        }
                )
                db.query(`
                        SELECT COUNT(*) = 0 AS Outcome
                        FROM Posts
                        WHERE PostID = ${post_id}
                        `,
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                } else {
                                        return res.json(data)
                                }
                        }
                )
        })



/*
------------------------- COMMENTS -------------------------
*/
        /*
                Options
        */
        const Comments = Prior + "/Comments"
                const CommentsFetchAll = Comments + "/Fetch"

                const CommentsFetchOnID = Comments + "/FetchOnID"
                const CommentsFetchOnUserID = Comments + "/FetchOnUserID"
                const CommentsFetchOnPostID = Comments + "/FetchOnPostID"
                const CommentsFetchAscLikesOnPostID = Comments + "/FetchAscLikes"
                const CommentsFetchDescLikesOnPostID = Comments + "/FetchDescLikes"
                const CommentsFetchOnUsername = Comments + "/FetchOnUsername"
                const CommentsFetchAscTimestampOnPostID = Posts + "/FetchAscTimestampOnPostID"
                const CommentsFetchDescTimestampOnPostID = Posts + "/FetchDescTimestampOnPostID"

                const CommentsInsertManual = Comments + "/InsertManual"
                const CommentsInsertForward = Comments + "/InsertForward"

                const CommentsIncrementLikes = Comments + "/IncrementLikes"
                const CommentsDecrementLikes = Comments + "/DecrementLikes"

                const CommentsDeleteOnID = Comments + "/DeleteOnID"

        /*
                .get parameters: [Path: str]
                .post return: ARRAY[{{"CommentID": int, "UserID": int, "Timestamp": str, "PostID": int, "Content": str, "Anonymous": bool, "Username": str}]
        */
        app.get(CommentsFetchAll, (req, res) => {
                db.query(`
                        SELECT 
                        A.CommentID, A.UserID, A.Timestamp, 
                        A.PostID, A.Content, A.Username, A.Anonymous,
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes
                        FROM Comments A
                        LEFT JOIN CommentLikes B ON A.CommentID = B.CommentID
                        `, 
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });


        /*
                .post parameters: [Path: str, {"CommentID": int}]
                .post return: [{{"CommentID": int, "UserID": int, "Timestamp": str, "PostID": int, "Content": str, "Anonymous": bool, "Username": str}]
        */
        app.post(CommentsFetchOnID, (req, res) => {
                const comment_id = req.body.CommentID
                db.query(`
                        SELECT 
                        A.CommentID, A.UserID, A.Timestamp, 
                        A.PostID, A.Content, A.Username, A.Anonymous,
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes
                        FROM Comments A
                        LEFT JOIN CommentLikes B ON A.CommentID = B.CommentID
                        WHERE A.CommentID = ${comment_id}
                        `,
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });



        /*
                .get parameters: [Path: str, {"UserID": int}]
                .post return: ARRAY[{{"CommentID": int, "UserID": int, "Timestamp": str, "PostID": int, "Content": str, "Anonymous": bool, "Username": str}]
        */
        app.get(CommentsFetchOnUserID, (req, res) => {
                const user_id = req.body.UserID
                db.query(`
                        SELECT 
                        A.CommentID, A.UserID, A.Timestamp, 
                        A.PostID, A.Content, A.Username, A.Anonymous,
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes
                        FROM Comments A
                        LEFT JOIN CommentLikes B ON A.CommentID = B.CommentID
                        WHERE A.UserID = ${user_id}
                        `, 
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });


        /*
                .get parameters: [Path: str, {"PostID": int}]
                .post return: ARRAY[{{"CommentID": int, "UserID": int, "Timestamp": str, "PostID": int, "Content": str, "Anonymous": bool, "Username": str}]
        */
        app.get(CommentsFetchOnPostID, (req, res) => {
                const post_id = req.body.PostID
                db.query(`
                        SELECT 
                        A.CommentID, A.UserID, A.Timestamp, 
                        A.PostID, A.Content, A.Username, A.Anonymous,
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes
                        FROM Comments A
                        LEFT JOIN CommentLikes B ON A.CommentID = B.CommentID
                        WHERE A.PostID = ${post_id}
                        `, 
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });


        /*
                .get parameters: [Path: str, {"PostID": int}]
                .post return: ARRAY[{{"CommentID": int, "UserID": int, "Timestamp": str, "PostID": int, "Content": str, "Anonymous": bool, "Username": str}]
        */
        app.get(CommentsFetchAscLikesOnPostID, (req, res) => {
                const post_id = req.body.PostID
                db.query(`
                        SELECT 
                        A.CommentID, A.UserID, A.Timestamp, 
                        A.PostID, A.Content, A.Username, A.Anonymous,
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes
                        FROM Comments A
                        LEFT JOIN CommentLikes B ON A.CommentID = B.CommentID
                        WHERE A.PostID = ${post_id}
                        ORDER BY Likes ASC
                        `, 
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });


        /*
                .get parameters: [Path: str, {"PostID": int}]
                .post return: ARRAY[{{"CommentID": int, "UserID": int, "Timestamp": str, "PostID": int, "Content": str, "Anonymous": bool, "Username": str}]
        */
        app.get(CommentsFetchDescLikesOnPostID, (req, res) => {
                const post_id = req.body.PostID
                db.query(`
                        SELECT 
                        A.CommentID, A.UserID, A.Timestamp, 
                        A.PostID, A.Content, A.Username, A.Anonymous,
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes
                        FROM Comments A
                        LEFT JOIN CommentLikes B ON A.CommentID = B.CommentID
                        WHERE A.PostID = ${post_id}
                        ORDER BY Likes DESC
                        `, 
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });


        /*
                .get parameters: [Path: str, {"Username": str}]
                .post return: ARRAY[{{"CommentID": int, "UserID": int, "Timestamp": str, "PostID": int, "Content": str, "Anonymous": bool, "Username": str}]
        */
        app.get(CommentsFetchOnUsername, (req, res) => {
                const username = req.body.Username
                db.query(`
                        SELECT 
                        A.CommentID, A.UserID, A.Timestamp, 
                        A.PostID, A.Content, A.Username, A.Anonymous,
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes
                        FROM Comments A
                        LEFT JOIN CommentLikes B ON A.CommentID = B.CommentID
                        WHERE A.Username = ${username}
                        `, 
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });


        /*
                .get parameters: [Path: str, {"PostID": str}]
                .post return: ARRAY[{{"CommentID": int, "UserID": int, "Timestamp": str, "PostID": int, "Content": str, "Anonymous": bool, "Username": str}]
        */
        app.get(CommentsFetchAscTimestampOnPostID, (req, res) => {
                const post_id = req.body.post_id
                db.query(`
                        SELECT 
                        A.CommentID, A.UserID, A.Timestamp, 
                        A.PostID, A.Content, A.Username, A.Anonymous,
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes
                        FROM Comments A
                        LEFT JOIN CommentLikes B ON A.CommentID = B.CommentID
                        WHERE A.PostID = ${post_id}
                        ORDER BY A.Timestamp ASC
                        `, 
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });


        /*
                .get parameters: [Path: str, {"PostID": str}]
                .post return: ARRAY[{{"CommentID": int, "UserID": int, "Timestamp": str, "PostID": int, "Content": str, "Anonymous": bool, "Username": str}]
        */
        app.get(CommentsFetchDescTimestampOnPostID, (req, res) => {
                const post_id = req.body.post_id
                db.query(`
                        SELECT 
                        A.CommentID, A.UserID, A.Timestamp, 
                        A.PostID, A.Content, A.Username, A.Anonymous,
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes
                        FROM Comments A
                        LEFT JOIN CommentLikes B ON A.CommentID = B.CommentID
                        WHERE A.PostID = ${post_id}
                        ORDER BY A.Timestamp DESC
                        `, 
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });

        
        /*
                .post parameters: [Path: str, {"CommentID": int, "UserID": int, "PostID": int, "Content": str, "Anonymous": bool, "Username": str}]
                .post return: [{{"CommentID": int, "UserID": int, "Timestamp": str, "PostID": int, "Content": str, "Anonymous": bool, "Username": str}]
        */
        app.post(CommentsInsertManual, (req, res) => {
                const comment_id = req.body.CommentID
                const user_id = req.body.UserID
                const post_id = req.body.PostID
                const content = req.body.Content
                const anonymous = req.body.Anonymous
                const username = req.body.Username
                
                db.query(`
                        INSERT INTO Comments (CommentID, UserID, Timestamp, PostID, Content, Anonymous, Username) 
                        VALUES (
                                ${comment_id}, 
                                ${user_id}, 
                                CURRENT_TIMESTAMP(), 
                                ${post_id}, 
                                ${content}, 
                                ${anonymous}, 
                                ${username}
                        )`,

                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                        }
                );

                var likes = 0
                db.query(`
                        INSERT INTO CommentLikes (UserID, CommentID, Likes)
                        VALUES (
                                ${user_id}, 
                                ${comment_id}, 
                                ${likes}
                        )`,
                        (err, data) => {}
                );

                db.query(`
                        SELECT Timestamp 
                        FROM Comments 
                        WHERE CommentID = ${comment_id}`, 
                        
                        (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                db.query(`
                                        SELECT * 
                                        FROM Comments 
                                        WHERE CommentID = (SELECT MAX(A.CommentID) FROM Comments A
                                )`,

                                (err, data) => {
                                        if (err) {
                                                return res.json(err)
                                        }
                                        else {
                                                return res.json(data)
                                        }
                                });
                        }
                });
        });


        /*
                .post parameters: [Path: str, {"CommentID": int}]
                .post return: [{{"CommentID": int, "UserID": int, "Timestamp": str, "PostID": int, "Content": str, "Anonymous": bool, "Username": str}]
        */
        app.post(CommentsFetchOnID, (req, res) => {
                const comment_id = req.body.CommentID
                db.query(`
                        SELECT 
                        A.CommentID, A.UserID, A.Timestamp, 
                        A.PostID, A.Content, A.Username, A.Anonymous,
                        CASE WHEN Likes IS NULL THEN 0 ELSE Likes END AS Likes
                        FROM Comments A
                        LEFT JOIN CommentLikes B ON A.CommentID = B.CommentID
                        WHERE A.CommentID = ${comment_id}
                        `,
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });


        /*
                .post parameters: [Path: str, {"UserID": int, "PostID": int, "Content": str, "Anonymous": bool, "Username": str}]
                .post return: [{{"CommentID": int, "UserID": int, "Timestamp": str, "PostID": int, "Content": str, "Anonymous": bool, "Username": str}]
        */
        app.post(CommentsInsertForward, (req, res) => {

                const user_id = req.body.UserID
                const post_id = req.body.PostID
                const content = req.body.Content
                const anonymous = req.body.Anonymous
                const username = req.body.Username
                
                db.query(`
                        INSERT INTO Comments (CommentID, UserID, Timestamp, PostID, Content, Anonymous, Username) 
                        VALUES (
                                (SELECT MAX(A.CommentID) + 1 FROM Comments A), 
                                ${user_id}, 
                                CURRENT_TIMESTAMP(), 
                                ${post_id}, 
                                ${content}, 
                                ${anonymous}, 
                                ${username}
                        )`,
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                        }
                );

                db.query(`
                        INSERT INTO CommentLikes (UserID, CommentID, Likes)
                        VALUES (
                                ${user_id}, 
                                (SELECT MAX(A.CommentID) + 1 FROM Comments A), 
                                0
                        )`,

                        (err, data) => {}
                );

                db.query(`
                        SELECT *
                        FROM Comments 
                        WHERE CommentID = (
                                SELECT MAX(A.CommentID) FROM Comments A
                        )`, 
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });


        /*
                .post parameters: [Path: str, {"UserID": int, "CommentID": int}]
                .post return: [{"NumLikes": int}]
        */
        app.post(CommentsIncrementLikes, (req, res) => {
                const user_id = req.body.UserID
                const comment_id = req.body.CommentID
                db.query(`
                        INSERT CommentLikes (UserID, CommentID, Likes)
                        VALUES (${user_id}, ${comment_id}, 1)
                        `,
                (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                db.query(`
                                        SELECT COUNT(*) as NumLikes
                                        WHERE CommentID = ${comment_id}
                                        `,
                                
                                        (err, data) => {
                                                if (err) {
                                                        return res.json(err)
                                                }
                                                else {
                                                        return res.json(data)
                                                }
                                        }
                                );
                        }
                });
        });
        app.post(CommentsDecrementLikes, (req, res) => {
                const user_id = req.body.UserID
                const comment_id = req.body.CommentID
                db.query(`
                        DELETE FROM CommentLikes
                        WHERE UserID = ${user_id} AND CommentID = ${comment_id}
                        `,
                (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                db.query(`
                                        SELECT COUNT(*) as NumLikes
                                        WHERE CommentID = ${comment_id}
                                        AND Likes = 1
                                        `,
                                
                                        (err, data) => {
                                                if (err) {
                                                        return res.json(err)
                                                }
                                                else {
                                                        return res.json(data)
                                                }
                                        }
                                );
                        }
                });
        });


        /*

        */
        app.post(CommentsDeleteOnID, (req, res) => {
                const comment_id = res.body.CommentID
                db.query(`
                        DELETE FROM Comments
                        WHERE CommentID = ${comment_id}
                        `,
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                } 
                        }
                );
                db.query(`
                        DELETE FROM CommentsLikes
                        WHERE CommentID = ${comment_id}
                        `,
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                } 
                        }
                );
                db.query(`
                        SELECT COUNT(*) = 0
                        WHERE CommentID = ${comment_id}
                        `,
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                )
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

                const UsersCheckUsernameExists = Users + "/CheckUsernameExists"
                const UsersCheckEmailExists = Users + "/CheckEmailExists"

                const UsersGetUsername = Users + "/GetUsername"
                const UsersGetPassword = Users + "/GetPassword"
                const UsersGetBio = Users + "/GetBio"
                const UsersGetEmail = Users + "/GetEmail"

                const UsersGetUserIDOnUsername = Users + "/GetUserIDOnUsername"

                const UsersChangeUsername = Users + "/ChangeUsername"
                const UsersChangePassword = Users + "/ChangePassword"
                const UsersChangeBio = Users + "/ChangeBio"
                const UsersChangeEmail = Users + "/ChangeEmail"

                const UsersValidateAccount = Users + "/ValidateAccount"
                const UsersDeleteAccount = Users + "/DeleteAccount"

        /*
                .get parameters: [Path: str]
                .post return: ARRAY[{"UserID": int "Username": str, "Password": str, "Bio": str, "Email": str}]
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
                .post return: [{"UserID": int "Username": str, "Password": str, "Bio": str, "Email": str}]
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
                .post return: [{"UserID": int "Username": str, "Password": str, "Bio": str, "Email": str}]
        */
        app.post(UsersInsertManual, (req, res) => {
                const user_id = req.body.UserID
                const username = req.body.Username
                const password = req.body.Password
                const bio = req.body.Bio
                const email = req.body.Email
                db.query(`
                        INSERT INTO Users (UserID, Username, Password, Bio, Email)
                        VALUES (
                                ${user_id}, 
                                ${username}, 
                                ${password}, 
                                ${bio}, 
                                ${email}
                        )`, 

                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                        }
                );
                db.query(`
                        SELECT * 
                        FROM Users 
                        WHERE UserID = ${user_id}
                        `,
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                )
        });


        /*
                .post parameters: [Path: str, {"Username": str, "Password": str, "Bio": str, "Email": str}]
                .post return: [{"UserID": int "Username": str, "Password": str, "Bio": str, "Email": str}]
        */
        app.post(UsersInsertForward, (req, res) => {
                const username = req.body.Username
                const password = req.body.Password
                const bio = req.body.Bio
                const email = req.body.Email

                db.query(`
                        INSERT INTO Users (UserID, Username, Password, Bio, Email)
                        VALUES 
                                ((SELECT MAX(A.UserID) + 1 FROM Users A), 
                                ${username}, 
                                ${password}, 
                                ${bio}, 
                                ${email})`, 

                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        db.query(`
                                                SELECT * 
                                                FROM Users 
                                                WHERE UserID = (SELECT MAX(A.UserID) FROM Users A)`,
                                        (err, data) => {
                                                if (err) {
                                                        return res.json(err)
                                                }
                                                else {
                                                        return res.json(data)
                                                }
                                        });
                                }
                        }
                );
        });


        /*
                .post parameters: [Path: str, {"Username": str, "Password": str, "Email": str}]
                .post return: [{"UserID": int "Username": str, "Password": str, "Bio": str, "Email": str}]
        */
        app.post(UsersInsertBasic, (req, res) => {
                const username = req.body.Username
                const password = req.body.Password
                const email = req.body.Email

                db.query(`
                        INSERT INTO Users (UserID, Username, Password, Bio, Email)
                        VALUES 
                                ((SELECT MAX(A.UserID) + 1 FROM Users A), 
                                ${username}, 
                                ${password}, 
                                "\'\'", 
                                ${email})`, 

                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                        }
                );
                db.query(`
                        SELECT *
                        FROM Users
                        WHERE UserID = (SELECT MAX(A.UserID) FROM Users A
                        )`,
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                } 
                                else {
                                        return res.json(data)
                                }
                        }
                )
        });

        
        /*
                .post paramters: [Path: str, {"Username": str}]
                .post return: [{"Existence": bool}]
        */
        app.post(UsersCheckUsernameExists, (req, res) => {
                const username = req.body.Username
                db.query(`
                        SELECT COUNT(*) > 0 as Existence
                        FROM Users
                        WHERE Username = ${username}
                        `,
                
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                } 
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });


        /*
                .post paramters: [Path: str, {"Email": str}]
                .post return: [{"Existence": bool}]
        */
        app.post(UsersCheckEmailExists, (req, res) => {
                const email = req.body.Email
                db.query(`
                        SELECT COUNT(*) > 0 as Existence
                        FROM Users
                        WHERE Email = ${email}
                        `,
                
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                } 
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });


        /*
                .post parameters: [Path: str, {"UserID": str}]
                .post return: [{"Username": str}]
        */
        app.post(UsersGetUsername, (req, res) => {
                const user_id = req.body.UserID
                db.query(`
                        SELECT Username
                        FROM Users 
                        WHERE UserID = ${user_id}
                        `,

                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });


        /*
                .post parameters: [Path: str, {"UserID": str}]
                .post return: [{"Password": str}]
        */
        app.post(UsersGetPassword, (req, res) => {
                const user_id = req.body.UserID
                db.query(`
                        SELECT Password
                        FROM Users 
                        WHERE UserID = ${user_id}
                        `,

                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });


        /*
                .post parameters: [Path: str, {"UserID": str}]
                .post return: [{"Bio": str}]
        */
        app.post(UsersGetBio, (req, res) => {
                const user_id = req.body.UserID
                db.query(`
                        SELECT Bio
                        FROM Users 
                        WHERE UserID = ${user_id}
                        `,

                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });


        /*
                .post parameters: [Path: str, {"UserEmail": str}]
                .post return: [{"Email": str}]
        */
        app.post(UsersGetEmail, (req, res) => {
                const user_id = req.body.UserEmail
                db.query(`
                        SELECT Email
                        FROM Users 
                        WHERE UserID = ${user_id}
                        `,
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });


        /*
                .post parameters: [Path: str, {"Username": str}]
                .post return: [{"Email": str}]
        */
        app.post(UsersGetUserIDOnUsername, (req, res) => {
                const username = req.body.Username
                db.query(`
                        SELECT UserID
                        FROM Users 
                        WHERE Username = ${username} 
                        `,
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                );
        });
        

        /*
                .post parameters: [Path: str, {"UserID" : str, "Username" : str}]
                .post return: [{"Username": str}]
        */
        app.post(UsersChangeUsername, (req, res) => {
                const user_id = req.body.UserID
                const username = req.body.Use
                db.query(`
                        UPDATE Users 
                        SET Username = ${username}
                        WHERE UserID = ${user_id}
                        `,

                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                } 
                        }
                );
                db.query(`
                        SELECT Username
                        FROM Users
                        WHERE UserID = ${user_id}
                        `,
                
                        (err, data) =>{
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                )
        });


        /*
                .post parameters: [Path: str, {"UserID" : str, "Password" : str}]
                .post return: [{"Password": str}]
        */
        app.post(UsersChangePassword, (req, res) => {
                const user_id = req.body.UserID
                const password = req.body.Password
                db.query(`
                        UPDATE Users 
                        SET Password = ${password}
                        WHERE UserID = ${user_id}
                        `,
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                        }
                );
                db.query(`
                        SELECT Password
                        FROM Users
                        WHERE UserID = ${user_id}
                        `,
                
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                )
        });


        /*
                .post parameters: [Path: str, {"UserID": str, "Bio": str]
                .post return: [{"Bio": str}]
        */
        app.post(UsersChangeBio, (req, res) => {
                const user_id = req.body.UserID
                const bio = req.body.Bio
                db.query(`
                        UPDATE Users 
                        SET Bio = ${bio}
                        WHERE UserID = ${user_id}
                        `,

                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                        }
                );
                db.query(`
                        SELECT Bio
                        FROM Users
                        WHERE UserID = ${user_id}
                        `,
                
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                )
        });


        /*
                .post parameters: [Path: str, {"user_id": str, "email": str}]
                .post return: [{"Email": str}]
        */
        app.post(UsersChangeEmail, (req, res) => {
                const user_id = req.body.UserID
                const email = req.body.Email
                db.query(`
                        UPDATE Users 
                        SET Email = ${email}
                        WHERE UserID = ${user_id}
                        `,
                
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                        }
                );
                db.query(`
                        SELECT Email
                        FROM Users
                        WHERE UserID = ${user_id}
                        `,
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                )
        });


        /*
                .post parameters: [Path: str, {"Username": str, "Password": str}]
                .post return: [{"Outcome": bool}]
        */
        app.post(UsersValidateAccount, (req, res) => {
                const username = req.body.Username
                const password = req.body.Password
                db.query(`
                        SELECT COUNT(*) = 1 as Outcome
                        FROM Users
                        WHERE 
                                Username = ${username}
                                AND Password = ${password}
                        `,
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                )
        });

        /*
                .post paramters: [Path: str, {"user_id": str}]
                .post return: [{"Outcome": bool}]
        */
        app.post(UsersDeleteAccount, (req, res) => {
                const user_id = req.body.UserID
                db.query(`
                        DELETE FROM Users
                        WHERE UserID = ${user_id}
                        `,
                
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                        }
                );
                db.query(`
                        SELECT COUNT(*) = 0 as Outcome
                        FROM Users
                        WHERE UserID = ${user_id}
                        `,
                        
                        (err, data) => {
                                if (err) {
                                        return res.json(err)
                                }
                                else {
                                        return res.json(data)
                                }
                        }
                )
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

        /*
                Helper: DO NOT USE IN PRODUCTION
        */
        // async function GetMaxPostID () {
        //         return new Promise((resolve, reject) => {
        //                 db.query("SELECT MAX(PostID) as Max FROM Posts", (err, data) => {
        //                         if (err) {
        //                                 reject(err)
        //                         } else {
        //                                 console.log("Max PostID:", data[0].Max)
        //                                 resolve(data[0].Max)
        //                         }
        //                 });
        //         });
        // }
        
        // GetMaxPostID()
        // .then((result) => {return res.json(result)})
        // .catch((result) => console.log("Unsuccesfully ran GetMaxUserID()\n"))

        // app.post ("") {
        //         db.query("SELECT MAX(PostID) as Max FROM Posts", (err, data) => {
        //                 return data;
        //         }); 
        // }

        // app.post("/Example", (req, res) => {
        //         const user_id = req.body.UserID
        //         const content = req.body.Content
        //         const anonymous = req.body.Anonymous
        //         const username = req.body.Username

                
        //         // var get_post_id = () => {db.query(`SELECT MAX(PostID) as Max FROM Posts`, (err, data) => {
        //         //         if (err) {
        //         //                 return res.json(err)
        //         //         }
        //         //         else {
        //         //                 post_id = data[0].Max + 1
        //         //                 return res.json(data[0].Max + 1)
        //         //         }
        //         // });};
        //         var post_id = GetMaxPostID()
        //         console.log("PostID: ", post_id)

        //         db.query(`INSERT INTO PostLikes (UserID, PostID, Likes)
        //                 VALUES (${user_id}, ${post_id}, 0)`,
        //         (err, data) => {});

        //         db.query(`INSERT INTO Posts (PostID, UserID, Timestamp, Content, Anonymous, Username) 
        //                 VALUES (${post_id}, ${user_id}, CURRENT_TIMESTAMP(), ${content}, ${anonymous}, ${username})
        //                 `,
        //         (err, data) => {
        //                 if (err) {
        //                         return res.json(err)
        //                 }
        //                 else {
        //                         attributes = {
        //                                 "PostID": post_id,
        //                                 "UserID": user_id,
        //                                 "Content": content,
        //                                 "Anonymous": anonymous
        //                         }
        //                         return res.json(attributes)
        //                 }
        //         });
        // });

        app.post("/Example", (req, res) => {
                const user_id = req.body.UserID
                const content = req.body.Content
                const anonymous = req.body.Anonymous
                const username = req.body.Username

                
                // var get_post_id = () => {db.query(`SELECT MAX(PostID) as Max FROM Posts`, (err, data) => {
                //         if (err) {
                //                 return res.json(err)
                //         }
                //         else {
                //                 post_id = data[0].Max + 1
                //                 return res.json(data[0].Max + 1)
                //         }
                // });};
                // var post_id = GetMaxPostID()
                // console.log("PostID: ", post_id)

                db.query(`INSERT INTO PostLikes (UserID, PostID, Likes)
                        VALUES (${user_id}, 
                                (SELECT MAX(PostID) + 1 as MAX FROM Posts), 
                                0)`,
                (err, data) => {});

                db.query(`INSERT INTO Posts (PostID, UserID, Timestamp, Content, Anonymous, Username) 
                        VALUES ((SELECT MAX(P.PostID) + 1 FROM Posts P), 
                                ${user_id}, CURRENT_TIMESTAMP(), 
                                ${content}, 
                                ${anonymous}, 
                                ${username})`,
                (err, data) => {
                        if (err) {
                                return res.json(err)
                        }
                        else {
                                db.query(`SELECT * 
                                        FROM Posts 
                                        WHERE PostID = (SELECT MAX(P.PostID) FROM Posts P)`,
                                (err,data) => {
                                        if (err) {
                                                return res.json(err)
                                        } 
                                        else {
                                                return res.json(data)
                                        }
                                });
                        }
                });
        });