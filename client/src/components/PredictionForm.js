import React, { useState } from "react";
import usePrediction from "../hooks/usePrediction";

const PredictionForm = ({ setResult, setLoading }) => {
const [formData, setFormData] = useState({
study: "",
sleep: "",
attendance: "",
prev_marks: ""
});

const { predict } = usePrediction(setResult, setLoading);

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: Number(e.target.value)
});
};

const handleSubmit = (e) => {
e.preventDefault();
predict(formData);
};

return ( <div className="container"> <form onSubmit={handleSubmit}> <input name="study" type="number" placeholder="Study Hours" onChange={handleChange} required /> <input name="sleep" type="number" placeholder="Sleep Hours" onChange={handleChange} required /> <input name="attendance" type="number" placeholder="Attendance" onChange={handleChange} required /> <input name="prev_marks" type="number" placeholder="Previous Marks" onChange={handleChange} required /> <button type="submit">Predict</button> </form> </div>
);
};

export default PredictionForm;
