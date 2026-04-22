// Student Performance Predictor - Express Backend Server
const express = require('express');
const cors = require('cors');
const path = require('path');

const predictRoutes = require('./routes/predict');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Serve static frontend files ──
// CSS, JS, assets served from /css/*, /js/*, /assets/*
app.use('/css', express.static(path.join(__dirname, '..', 'frontend', 'css')));
app.use('/js', express.static(path.join(__dirname, '..', 'frontend', 'js')));
app.use('/assets', express.static(path.join(__dirname, '..', 'frontend', 'assets')));

// ── API Routes ──
// POST /api/predict  →  proxies to Flask ML service (port 5000)
app.use('/api/predict', predictRoutes);

// ── Page Routes ──
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'pages', 'index.html'));
});

app.get('/predict', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'pages', 'predict.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'pages', 'dashboard.html'));
});

// Fallback: serve pages by filename  (e.g. /predict.html)
app.get('/:page.html', (req, res) => {
    const filePath = path.join(__dirname, '..', 'frontend', 'pages', `${req.params.page}.html`);
    res.sendFile(filePath, (err) => {
        if (err) res.status(404).send('Page not found');
    });
});

// ── Start server ──
app.listen(PORT, () => {
    console.log(`\n  ✅  SPP Backend running → http://localhost:${PORT}`);
    console.log(`  📄  Home       → http://localhost:${PORT}/`);
    console.log(`  🔮  Predict    → http://localhost:${PORT}/predict`);
    console.log(`  📊  Dashboard  → http://localhost:${PORT}/dashboard`);
    console.log(`  🔌  API        → POST http://localhost:${PORT}/api/predict\n`);
});

module.exports = app;
