const express = require('express');
const Simulation = require('./engine/Simulation');
const path = require('path');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (Frontend)
app.use(express.static(path.join(__dirname, '../public')));

// Global simulation instance (In a real production app, this would be stored in a DB or session)
let simulation = null;

/**
 * API Endpoint: Start a new simulation
 * Method: POST
 * Body: { popSize, mutationRate, ... }
 */
app.post('/api/simulation/start', (req, res) => {
    const config = req.body;
    simulation = new Simulation(config);
    
    // Calculate initial stats (Generation 0)
    simulation.population.calculateFitness();
    const initialStats = simulation.population.getStats();
    
    res.json({
        message: "Simulation started successfully.",
        config: simulation.config,
        initialStats: initialStats
    });
});

/**
 * API Endpoint: Advance the simulation
 * Method: POST
 * Body: { steps: number }
 */
app.post('/api/simulation/step', (req, res) => {
    if (!simulation) {
        return res.status(400).json({ error: "No active simulation. Please start one first." });
    }

    const steps = req.body.steps || 1;
    const latestStats = simulation.step(steps);

    res.json({
        message: `Advanced ${steps} generation(s).`,
        stats: latestStats
    });
});

/**
 * API Endpoint: Get current statistics
 * Method: GET
 */
app.get('/api/simulation/stats', (req, res) => {
    if (!simulation) {
        return res.status(400).json({ error: "No active simulation." });
    }
    res.json(simulation.getCurrentState());
});

/**
 * API Endpoint: Reset the simulation
 * Method: DELETE
 */
app.delete('/api/simulation/reset', (req, res) => {
    simulation = null;
    res.json({ message: "Simulation reset." });
});

module.exports = app;
