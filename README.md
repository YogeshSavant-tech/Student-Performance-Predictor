# Student-Performance-Predictor (GradeX)

Student Performance Predictor is a full-stack machine learning application that estimates student exam scores based on study habits and academic factors. It combines a regression model with a Flask API backend and a Node.js/Express frontend server to deliver real-time predictions, data tracking, and actionable insights for improving performance.

## Project Structure

```
Student-Performance-Predictor/
├── frontend/              # Frontend UI
│   ├── pages/             # HTML pages
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   └── assets/            # Static assets
├── backend/               # Node.js backend
│   ├── server.js          # Express server
│   ├── routes/            # API routes
│   ├── ml/                # ML integration
│   └── utils/             # Utilities
├── ml/                    # Machine Learning
│   └── data/              # Models, scripts & datasets
├── database/              # Database schemas
├── package.json           # Node.js dependencies
├── requirements.txt       # Python dependencies
└── README.md
```

## Getting Started

### Backend (Node.js)
```bash
npm install
npm run dev
```

### ML Service (Python)
```bash
pip install -r requirements.txt
cd ml/data
python train_model.py
python app.py
```
