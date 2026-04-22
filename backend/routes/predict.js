// Prediction route — proxies requests to Flask ML API (ml/data/app.py)
const express = require('express');
const router = express.Router();
const { validateInput } = require('../utils/validateInput');

// Flask ML service URL (ml/data/app.py runs on port 5000)
const FLASK_API_URL = process.env.FLASK_API_URL || 'http://localhost:5000';

router.post('/', async (req, res) => {
    try {
        // 1. Validate input
        const validation = validateInput(req.body);
        if (!validation.valid) {
            return res.status(400).json({ error: validation.message });
        }

        // 2. Forward to Flask ML service
        const response = await fetch(`${FLASK_API_URL}/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Flask API error (${response.status}): ${text}`);
        }

        // 3. Return ML prediction to frontend
        const result = await response.json();

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        return res.json({
            success: true,
            predicted_score: result.predicted_score,
        });

    } catch (error) {
        console.error('Prediction proxy error:', error.message);

        // Differentiate connection errors from other errors
        if (error.cause?.code === 'ECONNREFUSED') {
            return res.status(503).json({
                error: 'ML service is not running. Start it with: cd ml/data && python app.py'
            });
        }

        return res.status(500).json({ error: 'Prediction failed: ' + error.message });
    }
});

module.exports = router;
