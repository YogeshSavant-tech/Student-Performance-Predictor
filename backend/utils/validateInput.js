// GradeX - Input Validation Utility

/**
 * Validate prediction input data
 * @param {Object} data - Input data to validate
 * @returns {Object} Validation result { valid: boolean, message: string }
 */
function validateInput(data) {
    if (!data || typeof data !== 'object') {
        return { valid: false, message: 'Invalid input: data must be an object' };
    }

    // Add field-specific validations as needed
    const requiredFields = ['study_hours', 'attendance', 'previous_scores'];
    
    for (const field of requiredFields) {
        if (data[field] === undefined || data[field] === null) {
            return { valid: false, message: `Missing required field: ${field}` };
        }
        if (typeof data[field] !== 'number' || isNaN(data[field])) {
            return { valid: false, message: `Field ${field} must be a valid number` };
        }
    }

    return { valid: true, message: 'Input is valid' };
}

module.exports = { validateInput };
