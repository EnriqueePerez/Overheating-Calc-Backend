const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const UserService = require('../services/users');

const { config } = require('../config');

require('../utils/auth/basicStrategy');

function auth(app) {
  const router = express.Router();

  app.use('/auth', router);

  app.use(express.json());

  const userServices = new UserService();

  router.post('/sign-in', async function (req, res, next) {
    passport.authenticate('basic', function (error, user) {
      try {
        // console.log('este es el user', user);
        // console.log('este es el error', error);
        if (error || !user) {
          //If the user is not found, send error
          next(boom.unauthorized());
        }

        req.login(user, { session: false }, async (error) => {
          if (error) {
            next(error);
          }

          const { id_usuario, nombre, email, scopes } = user;

          //Preparing token with the scope
          const payload = {
            id: id_usuario,
            name: nombre,
            email: email,
            scopes,
          };

          //Signing token
          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '60m',
          });

          //Sending the token with the user
          res.cookie('token', scopes, {
            httpOnly: false,
            secure: false,
          });

          //   console.log(user);
          res.status(202).json({ token, user: { id_usuario, nombre } }); //remove token in production
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });
}

module.exports = auth;
