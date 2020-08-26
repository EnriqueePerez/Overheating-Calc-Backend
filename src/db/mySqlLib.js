const mysql = require('mysql');
const { config } = require('../config/index');

// const connection = mysql.createConnection({
//   host: config.dbHost,
//   user: config.dbUser,
//   password: config.dbPassword,
//   database: config.dbName,
// });

class mySqlLib {
  constructor() {
    this.client = mysql.createConnection({
      host: config.dbHost,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbName,
    }); //Creating the connection to db
    this.dbName = config.dbName; //Passing the dbName to the class
  }

  connect() {
    if (!mySqlLib.connection) {
      //Check if there is an active connection already
      mySqlLib.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err); //If error in connection, then reject promise
          }

          console.log('Connected succesfully to MySQL');
          // console.log(this.client);
          resolve(this.client);
        });
      });
    }
    return mySqlLib.connection; //If a connection exists, return it
  }

  //Setting general functions
  getAll(table, details, callback) {
    return this.connect().then((db) => {
      return db.query(`SELECT * FROM ${table} ${details}`, callback);
    });
  }

  //get?
  //create?
  //update?
  //delete?
}

module.exports = mySqlLib;
