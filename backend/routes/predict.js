// GradeX - Prediction Routes
const express = require('express');
const router = express.Router();
const { validateInput } = require('../utils/validateInput');
const { predict } = require('../ml/predictor');

// POST /api/predict - Make a prediction
router.post('/', async (req, res) => {
    try {
        const validation = validateInput(req.body);
        if (!validation.valid) {
            return res.status(400).json({ error: validation.message });
        }

        const result = await predict(req.body);
        res.json({ success: true, prediction: result });
    } catch (error) {
        console.error('Prediction error:', error);
        res.status(500).json({ error: 'Prediction failed' });
    }
});

module.exports = router;
