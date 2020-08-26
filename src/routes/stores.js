const express = require('express');
const StoresService = require('../services/stores');

// Schemas

//Validation data

function storeApi(app) {
  const router = express.Router();

  app.use('/api/stores', router); //using the route /api/stores by default, like a prefix

  const storesServices = new StoresService();

  router.get('/', async (req, res, next) => {
    try {
      const details = 'ORDER by nombre'; //extra info for query
      await storesServices.getStores(details, (err, results) => {
        if (err) {
          return err;
        }
        res.status(200).send(results);
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = storeApi;

// const db = require('../db/dbConnection');

// const connectToDB = () => {
//   db.connect();
//   console.log('Conectado a la DB');
// };

// const disconnectFromDB = () => {
//   db.end();
//   console.log('Desconectado de la DB');
// };

// module.exports = (router) => {
//   router.post('/', (req, res) => {
//     // const data = JSON.parse(req.body);
//     // console.log(data);
//     res.status(201).send('hola');
//   });

//   router.get('/stores', (req, res) => {
//     connectToDB();
//     db.query('SELECT * FROM stores ORDER BY nombre', (err, result) => {
//       if (err) {
//         res.status(400).send('error en la peticion');
//       }
//       const stores = result;
//       res.status(201).send(stores);
//       disconnectFromDB();
//     });
//   });
// };
