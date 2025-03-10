var mysql = require("mysql");
const cors = require("cors")


var hostname = "e7mhj.h.filess.io";
var database = "CitrusVineDB_oxygenbend";
var port = "3307";
var username = "CitrusVineDB_oxygenbend";
var password = "51eb7f921a83851a80e14c57d7c81c80624c1c12";

var db = mysql.createPool({
  host: hostname,
  user: username,
  password,
  database,
  port,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});


export const getCredentials = (username, callback) => {
  const query = 'SELECT Username, Password FROM Users WHERE Username = ?';
  db.query(query, [username], (err, results) => {
      if (err) {
          return callback(err, null);

      }
      else if (results.length  > 0) {
          return callback(null, results[0]);
      }
      else {
          return callback(null, null);
      }
  });

};

export default db;