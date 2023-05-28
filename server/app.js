const express = require('express');
var cors = require('cors');
const userRoutes = require('./routes/user');
const app = express();
const corsConfig = {
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
    methods: 'POST,GET,PUT,DELETE, PATCH, OPTIONS'
};

app.use(cors(corsConfig));
app.use(express.json());
app.use('/api/auth', userRoutes);

module.exports = app;