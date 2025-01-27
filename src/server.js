'use strict';

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const cors = require('cors');
app.use(cors());

// call routes
const authRoutes = require('../src/routers/auth')

// error handlers function
const notFoundPage = require('../src/error-handlers/404');
const errorHandler = require('../src/error-handlers/500');

// Process JSON input and put the data on req.body
app.use(express.json());
// Process FORM input and put the data on req.body
app.use(express.urlencoded({ extended: true }));
// require the routes
app.use(authRoutes)


// error middleware
app.use('*', notFoundPage);
app.use(errorHandler);

const start = (PORT, MONGODB_URI) => {
    mongoose.connect(MONGODB_URI, {
        useCreateIndex:true,
        useFindAndModify: false,
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(() => {
        console.log('connect to mongo ...');
        app.listen( PORT,  () => console.log(`Listening To PORT ${PORT} ...`));
    })
}

module.exports = {
    start,
    app
}
