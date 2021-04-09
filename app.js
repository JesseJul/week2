'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rootRoute = require('./routes/rootRoute');
const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');
const app = express();
const port = process.env.HTTP_PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
  require('./utils/production')(app, port);
} else {
  require('./utils/localhost')(app, process.env.HTTPS_PORT || 8000, port);
}


app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(express.static('uploads'));
//app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// routes
app.use('/', rootRoute);
app.use('/cat', catRoute);
app.use('/user', userRoute);

