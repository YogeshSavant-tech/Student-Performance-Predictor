// Results display component
import React from "react";

const ResultsDisplay = ({ result }) => {
return ( <div> <h2>📊 Predicted Score</h2> <p>{result ? result : "Waiting for prediction..."}</p> </div>
);
};

export default ResultsDisplay;
