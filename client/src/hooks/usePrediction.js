// Custom hook: usePrediction
import { predictAPI } from "../services/predictionApi";

const usePrediction = (setResult) => {
const predict = async (data) => {
try {
const res = await predictAPI(data);
setResult(res.score.toFixed(2));
} catch (err) {
setResult("Error");
}
};

return { predict };
};

export default usePrediction;
