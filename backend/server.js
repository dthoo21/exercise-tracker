const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import environment variables from file
require('dotenv').config();

// Create Express application
const app = express();

// Set port to 5000
const port = process.env.PORT || 5000;

// Set middleware
app.use(cors());
app.use(express.json());

// Connecting MongoDB to backend
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;

connection
    .once('open', () => {
        console.log("MongoDB database connection established successfully");
    })
    .on('error', (err) => {
        console.log("Error: ", err);
    });

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});