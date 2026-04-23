document.addEventListener("DOMContentLoaded", async () => {
    await loadStats();
    await loadHistory();
});

async function loadStats() {
    const container = document.getElementById("stats-cards");
    try {
        const res = await fetch("/api/history/stats");
        const data = await res.json();

        if (!data.success || !data.stats.total_predictions) {
            container.innerHTML = '<p class="muted">No predictions yet. Go to <a href="/predict">Predict</a> to get started.</p>';
            return;
        }

        const s = data.stats;
        container.innerHTML = `
            <div class="stat-card">
                <span class="stat-value">${s.total_predictions}</span>
                <span class="stat-label">Total Predictions</span>
            </div>
            <div class="stat-card">
                <span class="stat-value">${s.avg_score}</span>
                <span class="stat-label">Avg Score</span>
            </div>
            <div class="stat-card">
                <span class="stat-value">${s.min_score}</span>
                <span class="stat-label">Min Score</span>
            </div>
            <div class="stat-card">
                <span class="stat-value">${s.max_score}</span>
                <span class="stat-label">Max Score</span>
            </div>
            <div class="stat-card">
                <span class="stat-value">${s.avg_study_hours}h</span>
                <span class="stat-label">Avg Study Hours</span>
            </div>
            <div class="stat-card">
                <span class="stat-value">${s.avg_attendance}%</span>
                <span class="stat-label">Avg Attendance</span>
            </div>
        `;
    } catch (err) {
        container.innerHTML = '<p class="muted">Could not load stats.</p>';
    }
}

async function loadHistory() {
    const tbody = document.getElementById("history-body");
    const emptyMsg = document.getElementById("empty-msg");

    try {
        const res = await fetch("/api/history");
        const data = await res.json();

        if (!data.success || !data.predictions.length) {
            emptyMsg.style.display = "block";
            return;
        }

        emptyMsg.style.display = "none";
        tbody.innerHTML = data.predictions.map((p, i) => `
            <tr>
                <td>${data.predictions.length - i}</td>
                <td>${p.study_hours}</td>
                <td>${p.attendance}%</td>
                <td><strong>${p.predicted_score}</strong></td>
                <td>${new Date(p.created_at + "Z").toLocaleString()}</td>
            </tr>
        `).join("");
    } catch (err) {
        emptyMsg.style.display = "block";
        emptyMsg.textContent = "Could not load history.";
    }
}
