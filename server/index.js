require('dotenv').config();

// This Server Project is created with "npm init -y". After which dependencies are installed
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');

const apiRouter = require('./routes/api-router');

const app = express();

const SERVER_PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '5mb' }));

app.use('/api', apiRouter);

mongoose.connection.once('open', () => {
    app.listen(SERVER_PORT, () => {
        console.log(`Server is listening on port ${SERVER_PORT}`);
    });
});