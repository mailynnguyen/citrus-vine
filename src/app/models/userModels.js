import db from '../connection.js';


export function findUserByUsername(username) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Users WHERE Username = ?', [username], (err, results) => {
        if (err) {
          reject(err); // Reject if there's an error
        } else {
          resolve(results[0]); // Return the first user found
        }
      });
    });
  }