const mySqlLib = require('../db/mySqlLib');
const parser = require('../utils/preparingData');

class dataService {
  constructor() {
    this.table1 = 'data';
    this.table2 = 'dataSecondary';
    this.mySQL = new mySqlLib();
  }

  async createData(data, callback) {
    //Preparing the data
    const rawValues = data;
    const parsedValues = parser.parsingInsertedValues(rawValues);

    const createdData = await this.mySQL.createWithValidation(
      this.table1,
      parsedValues,
      callback
    );
    return createdData;
  }

  async updateData(data, callback) {
    const rawValues = data;

    const parsedValues = parser.parsingUpdatedValues(rawValues);
    const updateData = await this.mySQL.updateData(
      this.table1,
      parsedValues,
      callback
    );
    return updateData;
  }

  async createDataSecondary(data, callback) {
    //Preparing the data
    const rawValues = data;
    const parsedValues = parser.parsingInsertedValues(rawValues);

    const createdDataSecondary = await this.mySQL.createWithValidation(
      this.table2,
      parsedValues,
      callback
    );
    return createdDataSecondary;
  }

  async updateDataSecondary(data, callback) {
    const rawValues = data;

    const parsedValues = parser.parsingUpdatedValues(rawValues);
    const updateData = await this.mySQL.updateData(
      this.table2,
      parsedValues,
      callback
    );
    return updateData;
  }

  //updateData
}

module.exports = dataService;
