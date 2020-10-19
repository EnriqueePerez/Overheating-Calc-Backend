const mySqlLib = require('../db/mySqlLib');
var generatePassword = require('password-generator');
const bcrypt = require('bcrypt');

class UserService {
  constructor() {
    this.table = 'usersLogin';
    this.mySQL = new mySqlLib();
  }

  //looking for the user in the db
  async getUser({ email }) {
    const [user] = await this.mySQL.getAll(this.table, '', callback);
    return user;
  }

  async createUser({ user }, callback) {
    let { name, email } = user;
    const password = generatePassword();
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await this.mySQL.create(
      this.table,
      { name, email, password: hashedPassword },
      callback
    );

    return { createdUser, password };
  }

  //deleteUser??
}

module.exports = UserService;
