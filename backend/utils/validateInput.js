// Input validation for prediction requests

/**
 * Validate the incoming prediction data.
 * The ML model (train_model.py) was trained on: study_hours, attendance
 * The frontend form sends: study_hours, sleep_hours, attendance, previous_marks
 * We validate all form fields, but only study_hours & attendance go to the model.
 */
function validateInput(data) {
    if (!data || typeof data !== 'object') {
        return { valid: false, message: 'Invalid input: request body must be a JSON object' };
    }

    const numericFields = [
        { name: 'study_hours',    min: 0, max: 24  },
        { name: 'attendance',     min: 0, max: 100 },
    ];

    // Optional fields from the frontend form (not used by current model but still validated)
    const optionalFields = [
        { name: 'sleep_hours',    min: 0, max: 24  },
        { name: 'previous_marks', min: 0, max: 100 },
    ];

    // Validate required fields
    for (const field of numericFields) {
        if (data[field.name] === undefined || data[field.name] === null) {
            return { valid: false, message: `Missing required field: ${field.name}` };
        }
        const val = Number(data[field.name]);
        if (isNaN(val)) {
            return { valid: false, message: `${field.name} must be a valid number` };
        }
        if (val < field.min || val > field.max) {
            return { valid: false, message: `${field.name} must be between ${field.min} and ${field.max}` };
        }
    }

    // Validate optional fields if present
    for (const field of optionalFields) {
        if (data[field.name] !== undefined && data[field.name] !== null) {
            const val = Number(data[field.name]);
            if (isNaN(val)) {
                return { valid: false, message: `${field.name} must be a valid number` };
            }
            if (val < field.min || val > field.max) {
                return { valid: false, message: `${field.name} must be between ${field.min} and ${field.max}` };
            }
        }
    }

    return { valid: true, message: 'Input is valid' };
}

module.exports = { validateInput };
