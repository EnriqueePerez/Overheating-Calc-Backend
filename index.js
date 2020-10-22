const express = require('express');
const cors = require('cors');
const app = express();

const { config } = require('./src/config/index');
const storeApi = require('./src/routes/stores');
const addInfo = require('./src/routes/addInfo');
const auth = require('./src/routes/auth');
const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./src/utils/middlewares/errorHandlers');
const notFoundHandler = require('./src/utils/middlewares/notFoundHandler');

app.use(
  cors({
    origin: config.clientIp,
  })
);

//body parser
app.use(express.json());

//routes
storeApi(app);
addInfo(app);
auth(app);

// Catching 404 error
app.use(notFoundHandler);

// error middlewares
app.use(logErrors); //log error on console
app.use(wrapErrors); // managing if it is a boom error or not
app.use(errorHandler); //Sending the error to client

app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`);
});

// const app = require('./src/config/server');
// require('./src/routes/router')(app);

// app.listen(app.get('port'), () => {
//   console.log('App corriendo en puerto', app.get('port'));
// });
