'use strict';

const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const dotenv = require('dotenv')
const chalk = require('chalk');

const app = express()
dotenv.load();

var MONGODB_PORT = process.env.MONGODB_PORT || 27017;

//DB setup
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo:' + MONGODB_PORT);

mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('[Error]'));
  process.exit();
});

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));

app.get('/', function (req, res) {
  res.send('Hello World!!!!')
})

app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('√'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
})

module.exports = app;
