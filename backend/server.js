// GradeX Backend - Express Server
const express = require('express');
const cors = require('cors');
const path = require('path');

const predictRoutes = require('./routes/predict');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// API Routes
app.use('/api/predict', predictRoutes);

// Serve index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'pages', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`GradeX server running on http://localhost:${PORT}`);
});

module.exports = app;
