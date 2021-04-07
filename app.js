'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoute');
const passport = require('./utils/pass');
const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');
const app = express();
const port = 3000;



app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('week2_public_html'));
app.use(express.static('uploads'));

// routes
app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', {session: false}), catRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));