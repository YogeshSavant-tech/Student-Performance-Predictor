import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PredictionForm from "../components/PredictionForm";
import ResultsDisplay from "../components/ResultsDisplay";
import Footer from "../components/Footer";

const HomePage = () => {
const [result, setResult] = useState(null);
const [loading, setLoading] = useState(false);

return (
<> <Navbar /> <PredictionForm setResult={setResult} setLoading={setLoading} /> <ResultsDisplay result={result} loading={loading} /> <Footer />
</>
);
};

export default HomePage;
