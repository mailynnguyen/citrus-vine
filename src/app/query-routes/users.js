import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const router = express.Router()
router.use(cors())
router.use(express.json())

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


router.get('/Exists/:Username', (req, res) => {
        console.log("Checking if username exists: ", req.params.Username)
        db.query(`
                SELECT COUNT(*) > 0 as Existence
                FROM Users
                WHERE Username = \'${req.params.Username}\'
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


export default router;