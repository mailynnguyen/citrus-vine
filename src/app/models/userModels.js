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

export function findUserByEmail(email) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Users WHERE Email = ?', [email], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
}

export function insertNewUser(user) {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO Users (Username, Password, Email) VALUES (?, ?, ?)', [user.username, user.password, user.email], (err, results) => {
      if (err) {
        reject(err);
      } else {
        const insertedUser = results.Username;
        db.query('SELECT * FROM Users WHERE Username = ?', [insertedUser], (err, userResults) => {
          if (err) {
            reject(err); 
          } else {
            resolve(userResults[0]);
          }
        });
      }
    });
  });
}

export function insertNewUserByEmail(user) {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO Users (Username, Password, Email, AssignedProfilePic) VALUES (?, ?, ?, ?)', [user.email, user.email, user.email, user.picture], (err, results) => {
      if (err) {
        reject(err);
      } else {
        const insertedUser = results.Username;
        db.query('SELECT * FROM Users WHERE Username = ?', [insertedUser], (err, userResults) => {
          if (err) {
            reject(err);
          } else {
            resolve(userResults[0]);
          }
        })
      }
    })
  })
}