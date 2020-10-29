const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const cookieParser = require('cookie-parser');
const UserService = require('../services/users');

const { config } = require('../config');

require('../utils/auth/basicStrategy');

function auth(app) {
  const router = express.Router();

  app.use(cookieParser());
  app.use(express.json());
  app.use('/auth', router);

  const userServices = new UserService();

  router.post(
    '/login',
    passport.authenticate('basic', { session: false }),
    function (req, res, next) {
      if (!req.user) {
        next(boom.unauthorized());
      }

      const { id_usuario, nombre, email, scopes } = req.user;

      //Preparing token with the scope
      const payload = {
        id: id_usuario,
        name: nombre,
        email: email,
        scopes,
      };

      // Signing token
      const token = jwt.sign(payload, config.authJwtSecret, {
        expiresIn: '60m',
      });

      // res.setHeader('Access-Control-Allow-Credentials', 'true');

      res
        .cookie('tokenDeServer', token, {
          httpOnly: true,
          secure: false,
          path: '/',
          maxAge: 3600000,
        })
        .status(202)
        .json({ user: { id: id_usuario, name: nombre } });
    }
  );

  router.get('/check', function (req, res, next) {
    console.log(req.headers);
    console.log(req.cookies);
    res.send('todo bien');
  });
}

module.exports = auth;