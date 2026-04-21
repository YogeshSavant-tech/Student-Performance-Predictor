    import React from "react";

    const ResultsDisplay = ({ result, loading }) => {
    return ( <div> <h2>📊 Predicted Score</h2>

    
    {loading ? (
        <div className="loader"></div>
    ) : (
        <p id="result">
        {result ? result : "Waiting for prediction..."}
        </p>
    )}
    </div>
    

    );
    };

    export default ResultsDisplay;
