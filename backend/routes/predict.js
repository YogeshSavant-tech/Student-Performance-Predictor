const express = require('express');
const router = express.Router();
const { validateInput } = require('../utils/validateInput');
const db = require('../db');

const FLASK_API_URL = process.env.FLASK_API_URL || 'http://localhost:5000';

router.post('/', async (req, res) => {
    try {
        const validation = validateInput(req.body);
        if (!validation.valid) {
            return res.status(400).json({ error: validation.message });
        }

        const response = await fetch(`${FLASK_API_URL}/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Flask API error (${response.status}): ${text}`);
        }

        const result = await response.json();

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        // Save prediction to database
        const { study_hours, sleep_hours, attendance, previous_marks } = req.body;
        db.prepare(`
            INSERT INTO predictions (study_hours, sleep_hours, attendance, previous_marks, predicted_score)
            VALUES (?, ?, ?, ?, ?)
        `).run(study_hours, sleep_hours || null, attendance, previous_marks || null, result.predicted_score);

        return res.json({
            success: true,
            predicted_score: result.predicted_score,
        });

    } catch (error) {
        console.error('Prediction proxy error:', error.message);

        if (error.cause?.code === 'ECONNREFUSED') {
            return res.status(503).json({
                error: 'ML service is not running. Start it with: cd ml/data && python app.py'
            });
        }

        return res.status(500).json({ error: 'Prediction failed: ' + error.message });
    }
});

module.exports = router;
