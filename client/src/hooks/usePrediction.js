const usePrediction = (setResult, setLoading) => {

const predict = (data) => {
setLoading(true);

```
setTimeout(() => {
  const { study = 0, sleep = 0, attendance = 0, prev_marks = 0 } = data;

  const score =
    study * 4 +
    sleep * 2 +
    attendance * 0.3 +
    prev_marks * 0.5;

  setResult(score.toFixed(2));
  setLoading(false);
}, 1500);
```

};

return { predict };
};

export default usePrediction;
