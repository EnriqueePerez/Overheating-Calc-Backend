const express = require('express');
const DataService = require('../services/data');

function addInfo(app) {
  const router = express.Router();

  app.use('/api/data', router); //using the route /api/data by default, like a prefix

  const dataServices = new DataService();

  router.post('/', async (req, res, next) => {
    try {
      const creatingData = await dataServices.createData(
        req.body,
        (err, results) => {
          if (err) {
            next(err);
          } else {
            // console.log(results.affectedRows);
            // console.log(results.length);
            if (!results.affectedRows) {
              res.status(409).send('dato repetido');
            } else {
              console.log(results);
              res.status(201).send('dato insertado correctamente');
            }
          }
        }
      );
    } catch (err) {
      console.log('Pasando a errorMiddleware...');
      next(err);
    }
  });
}

module.exports = addInfo;
