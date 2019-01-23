const express = require('express');
const app = express();
const PORT = 5000;
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const apiRouter = require('./api');
const db = require('./db');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', apiRouter);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  
} else {
  app.use(express.static(path.join(__dirname, '../public')));

  app.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
  });

  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error!');
  });
}

db.sync()
.then(() => {
  console.log('db is synced!');
}).catch(console.error);

app.listen(process.env.PORT || PORT, () => {
        console.log(`listening on PORT ${PORT}`);
});

module.exports = app;