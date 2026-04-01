const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');

const app = express();

// Middleware
app.use(cors());
app.use(logger);
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to ClixCLI Generated Backend!' });
});

// Routes will be injected here by ClixCLI

module.exports = app;
