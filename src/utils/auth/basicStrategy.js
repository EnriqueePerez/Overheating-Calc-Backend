const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserService = require('../../services/users');

passport.use(
  new BasicStrategy(async function (email, password, done) {
    //init an new user service
    const userService = new UserService();

    //verifying the user

    try {
      //looking for the user in the db
      const user = await userService.getUser({ email });

      if (!user) {
        return done(boom.unauthorized(), false); //not user found
      }

      //comparing the given password with the saved password
      else if (!(await bcrypt.compare(password, user.password))) {
        return done(boom.unauthorized(), false); //password incorrect
      }

      delete user.password; //deleting the saved password for security

      return done(null, user); //everything ok, send user back without the password
    } catch (err) {
      return done(err);
    }
  })
);
