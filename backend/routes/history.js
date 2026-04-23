const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/history — return all predictions (newest first)
router.get('/', (req, res) => {
    try {
        const rows = db.prepare(
            'SELECT * FROM predictions ORDER BY created_at DESC LIMIT 50'
        ).all();

        res.json({ success: true, predictions: rows });
    } catch (err) {
        console.error('History fetch error:', err.message);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

// GET /api/history/stats — return summary stats
router.get('/stats', (req, res) => {
    try {
        const stats = db.prepare(`
            SELECT 
                COUNT(*) as total_predictions,
                ROUND(AVG(predicted_score), 2) as avg_score,
                ROUND(MIN(predicted_score), 2) as min_score,
                ROUND(MAX(predicted_score), 2) as max_score,
                ROUND(AVG(study_hours), 1) as avg_study_hours,
                ROUND(AVG(attendance), 1) as avg_attendance
            FROM predictions
        `).get();

        res.json({ success: true, stats });
    } catch (err) {
        console.error('Stats fetch error:', err.message);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

module.exports = router;
