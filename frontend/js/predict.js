document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("predict-form");
    const resultEl = document.getElementById("result");
    const submitBtn = document.getElementById("submit-btn");

    if (!form || !resultEl || !submitBtn) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const study = parseFloat(document.getElementById("study_hours").value);
        const sleep = parseFloat(document.getElementById("sleep_hours").value);
        const attendance = parseFloat(document.getElementById("attendance").value);
        const previous = parseFloat(document.getElementById("previous_marks").value);

        // 🔴 Basic validation
        if ([study, sleep, attendance, previous].some(isNaN)) {
            resultEl.className = "result error";
            resultEl.innerHTML = "<p>❌ Please fill all fields correctly.</p>";
            return;
        }

        const data = {
            study_hours: study,
            sleep_hours: sleep,
            attendance: attendance,
            previous_marks: previous,
        };

        resultEl.className = "result";
        resultEl.innerHTML = "<p>Predicting...</p>";

        submitBtn.disabled = true;
        submitBtn.textContent = "Predicting...";

        try {
            const response = await fetch("http://localhost:5000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Server returned " + response.status);
            }

            const result = await response.json();
            const score = result.predicted_score;

            resultEl.className = "result success";
            resultEl.innerHTML = `
        <p>Predicted Score</p>
        <h2>${Number(score).toFixed(2)}</h2>
      `;
        } catch (err) {
            resultEl.className = "result error";
            resultEl.innerHTML = `<p>❌ Failed to fetch prediction.<br/><small>${err.message}</small></p>`;
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Predict";
        }
    });
});