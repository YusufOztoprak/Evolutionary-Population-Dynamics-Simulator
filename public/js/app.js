// Chart.js Instances
let popChart, fitnessChart;
let isRunning = false;
let intervalId = null;

// Initialize Charts
function initCharts() {
    const ctxPop = document.getElementById('popChart').getContext('2d');
    popChart = new Chart(ctxPop, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Population Size (N)',
                data: [],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    const ctxFit = document.getElementById('fitnessChart').getContext('2d');
    fitnessChart = new Chart(ctxFit, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Avg Fitness',
                data: [],
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 1.0 } } }
    });
}

// Update Charts with new data
function updateCharts(stats) {
    // Add Generation label
    popChart.data.labels.push(stats.generation);
    fitnessChart.data.labels.push(stats.generation);

    // Add Data
    popChart.data.datasets[0].data.push(stats.populationSize);
    fitnessChart.data.datasets[0].data.push(stats.avgFitness);

    // Limit to last 50 points for performance
    if (popChart.data.labels.length > 50) {
        popChart.data.labels.shift();
        popChart.data.datasets[0].data.shift();
        fitnessChart.data.labels.shift();
        fitnessChart.data.datasets[0].data.shift();
    }

    popChart.update();
    fitnessChart.update();
}

// Start Simulation
document.getElementById('configForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const config = {
        popSize: parseInt(document.getElementById('popSize').value),
        carryingCapacity: parseInt(document.getElementById('carryingCapacity').value),
        growthRate: parseFloat(document.getElementById('growthRate').value),
        optimalValue: parseFloat(document.getElementById('optimalValue').value),
        mutationRate: parseFloat(document.getElementById('mutationRate').value),
        mutationSigma: parseFloat(document.getElementById('mutationSigma').value)
    };

    try {
        const res = await fetch('/api/simulation/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config)
        });
        const data = await res.json();
        
        // Reset Charts
        popChart.data.labels = [];
        popChart.data.datasets[0].data = [];
        fitnessChart.data.labels = [];
        fitnessChart.data.datasets[0].data = [];
        
        updateCharts(data.initialStats);
        alert('Simulation Started!');
    } catch (err) {
        console.error(err);
        alert('Error starting simulation.');
    }
});

// Step Button
document.getElementById('stepBtn').addEventListener('click', async () => {
    try {
        const res = await fetch('/api/simulation/step', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ steps: 1 })
        });
        const data = await res.json();
        updateCharts(data.stats);
    } catch (err) {
        console.error(err);
    }
});

// Auto Run Button
document.getElementById('autoRunBtn').addEventListener('click', () => {
    const btn = document.getElementById('autoRunBtn');
    
    if (isRunning) {
        // Stop
        clearInterval(intervalId);
        isRunning = false;
        btn.textContent = "Auto Run";
        btn.classList.remove('btn-danger');
        btn.classList.add('btn-warning');
    } else {
        // Start
        isRunning = true;
        btn.textContent = "Stop";
        btn.classList.remove('btn-warning');
        btn.classList.add('btn-danger');
        
        intervalId = setInterval(async () => {
            try {
                const res = await fetch('/api/simulation/step', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ steps: 1 })
                });
                const data = await res.json();
                updateCharts(data.stats);
            } catch (err) {
                console.error(err);
                clearInterval(intervalId);
            }
        }, 100); // 100ms delay
    }
});

// Reset Button
document.getElementById('resetBtn').addEventListener('click', async () => {
    await fetch('/api/simulation/reset', { method: 'DELETE' });
    location.reload();
});

// Initialize on load
initCharts();
