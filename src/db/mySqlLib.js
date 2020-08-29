const mysql = require('mysql');
const { config } = require('../config/index');
const parsingValues = require('../utils/preparingData');

// const errorHandler = require('../utils/middlewares/errorHandlers');

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
          } else {
            console.log('Connected succesfully to MySQL');
            // console.log(this.client);
            resolve(this.client);
          }
        });
      });
    }
    return mySqlLib.connection; //If a connection exists, return it
  }

  //Setting general functions
  getAll(table, details, callback) {
    return this.connect()
      .then((db) => {
        return db.query(`SELECT * FROM ${table} ${details}`, callback);
      })
      .catch((err) => {
        throw err;
      });
  }

  async createWithValidation(data, callback) {
    //Preparing the data
    const rawValues = data;
    const parsedValues = parsingValues(rawValues);

    //Establishing connection with db
    const query = await this.connect()
      .then((db) => {
        return db.query(
          `CALL validatingData(${'?, '.repeat(14).concat('?')});`,
          parsedValues,
          callback
        );
      })
      .catch((err) => {
        throw err;
      });
    return query;
  }

  //get?
  //create?
  //update?
  //delete?
}

module.exports = mySqlLib;
