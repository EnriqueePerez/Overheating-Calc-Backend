const express = require('express');
const db = require('../db/dbConnection');

const connectToDB = () => {
  db.connect();
  console.log('Conectado a la DB');
};

const disconnectFromDB = () => {
  db.end();
  console.log('Desconectado de la DB');
};

module.exports = (router) => {
  router.post('/', (req, res) => {
    // const data = JSON.parse(req.body);
    // console.log(data);
    res.status(201).send('hola');
  });

  router.get('/stores', (req, res) => {
    connectToDB();
    db.query('SELECT * FROM stores ORDER BY nombre', (err, result) => {
      const stores = result;
      // console.log(stores, 'esto fue stores');
      // for (let i = 0; i < stores.length; i++) {
      //   // console.log(stores[i].nombre);
      //   // console.log(`${stores[i].CR} ${stores[i].nombre}`);
      // }
      // res.send(stores);
      res.send(stores);
      // res.send({ stores: result });
      // console.log(result);
      disconnectFromDB();
    });
  });
};
