// Custom hook: useForm
import { useState } from "react";

const useForm = () => {
const [formData, setFormData] = useState({
study: "",
sleep: "",
attendance: "",
prev_marks: ""
});

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value
});
};

return { formData, handleChange };
};

export default useForm;
