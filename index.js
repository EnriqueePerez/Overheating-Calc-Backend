const app = require('./src/config/server');
require('./src/routes/router')(app);

app.listen(app.get('port'), () => {
  console.log('App corriendo en puerto', app.get('port'));
});
