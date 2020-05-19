const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');
const categoryRoutes = require('./api/routes/category');
const { summary } = require('./api/controllers/orders');
const { adminAuth } = require('./api/middleware/check-auth');
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL_DEV);

const app = express();
// Log request data
app.use(morgan('dev'));

// Setup static files path
app.use('/uploads', express.static('uploads'));
app.use('/', express.static('public'));

// Use body parser middleware to parse body of incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use((req, res, next) => {
    console.log({ body: req.body });
    console.log({ query: req.query });
    console.log({ params: req.params });

    next();
});


// Routes which should handle requests
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/summary', adminAuth, summary);
app.use('/test', (req, res) => {
    res.json({ message: "API IS WORKING..." })
});

app.use('/api/uploads*', (req, res, next) => {
    try {
        res.sendFile(__dirname + '/uploads' + req.params[0])
    } catch (error) {
        next();
    }
})

app.use('/*', (req, res, next) => {
    try {
        res.sendFile(__dirname + '/public/index.html')
    } catch (error) {
        next();
    }
})

// Handle Error Requests
app.use((req, res, next) => {
    const error = new Error();
    error.message = 'Not Found';
    error.status = 404;

    next(error);
});

app.use((error, req, res, next) => {
    console.log(error);

    res.status(error.status || 500).json({
        error
    });
});

module.exports = app;