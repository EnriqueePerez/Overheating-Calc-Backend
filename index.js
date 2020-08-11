const express = require('express');
const router = express.Router();

const app = express();
app.use(router);

app.listen(5000);
console.log('App corriendo en http://localhost:5000');
