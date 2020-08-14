if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db/dbConnection');

const connectToDB = () => {
  db.connect();
  console.log('Conectado a la DB');
};

const corsOptions = {
  origin: process.env.CLIENT_IP,
  optionsSuccessStatus: 201, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.text());
app.set('port', process.env.PORT || 5000);
connectToDB();
app.use(router);

router.post('/', (req, res) => {
  const data = JSON.parse(req.body);
  console.log(data);
  res.status(201).send('hola');
});

router.get('/stores', (req, res) => {
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
  });
});

app.listen(app.get('port'), () => {
  console.log('App corriendo en puerto', app.get('port'));
});
