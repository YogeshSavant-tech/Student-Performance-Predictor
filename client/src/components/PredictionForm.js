// Prediction form component
import React from "react";
import useForm from "../hooks/useForm";
import usePrediction from "../hooks/usePrediction";

const PredictionForm = ({ setResult }) => {
const { formData, handleChange } = useForm();
const { predict } = usePrediction(setResult);

const handleSubmit = (e) => {
e.preventDefault();
predict(formData);
};

return ( <div className="container"> <form onSubmit={handleSubmit}> <input type="number" name="study" placeholder="Study Hours" onChange={handleChange} required /> <input type="number" name="sleep" placeholder="Sleep Hours" onChange={handleChange} required /> <input type="number" name="attendance" placeholder="Attendance" onChange={handleChange} required /> <input type="number" name="prev_marks" placeholder="Previous Marks" onChange={handleChange} required /> <button type="submit">Predict</button> </form> </div>
);
};

export default PredictionForm;
