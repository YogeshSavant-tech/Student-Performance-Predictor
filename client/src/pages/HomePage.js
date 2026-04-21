// Home page
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PredictionForm from "../components/PredictionForm";
import ResultsDisplay from "../components/ResultsDisplay";
import Footer from "../components/Footer";

const HomePage = () => {
const [result, setResult] = useState(null);

return (
<> <Navbar /> <PredictionForm setResult={setResult} /> <ResultsDisplay result={result} /> <Footer />
</>
);
};

export default HomePage;
