-- GradeX Database Schema
-- Student Performance Predictor

CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS predictions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    study_hours DECIMAL(4,2),
    attendance DECIMAL(5,2),
    previous_scores DECIMAL(5,2),
    predicted_score DECIMAL(5,2),
    actual_score DECIMAL(5,2),
    predicted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id)
);
