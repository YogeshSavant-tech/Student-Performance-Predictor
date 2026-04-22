// GradeX - ML Model Loader
// Loads the trained ML model for prediction use

const path = require('path');

const MODEL_PATH = path.join(__dirname, '..', '..', 'ml', 'data', 'model.pkl');

/**
 * Load the trained model from disk
 * @returns {Object} The loaded model reference
 */
function loadModel() {
    console.log(`Loading model from: ${MODEL_PATH}`);
    // Model loading logic will interface with the Python ML service
    return { modelPath: MODEL_PATH, loaded: true };
}

module.exports = { loadModel, MODEL_PATH };
