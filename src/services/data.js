const mySqlLib = require('../db/mySqlLib');

class dataService {
  constructor() {
    this.table = 'data';
    this.mySQL = new mySqlLib();
  }

  async createData(data, callback) {
    const createdData = await this.mySQL.createWithValidation(data, callback);
    return createdData;
  }

  //updateData
}

module.exports = dataService;
