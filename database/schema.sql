-- Student Performance Predictor - SQLite Schema

CREATE TABLE IF NOT EXISTS predictions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    study_hours REAL NOT NULL,
    sleep_hours REAL,
    attendance REAL NOT NULL,
    previous_marks REAL,
    predicted_score REAL NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
);
