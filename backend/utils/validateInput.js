
function validateInput(data) {
    if (!data || typeof data !== 'object') {
        return { valid: false, message: 'Invalid input: request body must be a JSON object' };
    }

    const numericFields = [
        { name: 'study_hours', min: 0, max: 24 },
        { name: 'attendance', min: 0, max: 100 },
    ];

    const optionalFields = [
        { name: 'sleep_hours', min: 0, max: 24 },
        { name: 'previous_marks', min: 0, max: 100 },
    ];
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
