const Population = require('./Population');

/**
 * Controller class for the simulation.
 * Bridges the API requests with the evolutionary engine.
 */
class Simulation {
    constructor(config) {
        // Default configuration with scientific parameters
        this.config = {
            popSize: config.popSize || 50,           // Initial population size (N0)
            mutationRate: config.mutationRate || 0.1, // Probability of mutation per individual
            mutationSigma: config.mutationSigma || 1.0, // Magnitude of mutation
            optimalValue: config.optimalValue || 10.0, // The environmental target (x_opt)
            tolerance: config.tolerance || 5.0,      // Width of the fitness function (sigma_env)
            carryingCapacity: config.carryingCapacity || 1000, // Max population (K)
            growthRate: config.growthRate || 0.5     // Intrinsic growth rate (r)
        };

        this.population = new Population(this.config.popSize, this.config);
        this.history = []; // Stores stats for each generation
    }

    /**
     * Advances the simulation by a specified number of generations.
     * @param {number} steps - Number of generations to simulate.
     * @returns {Object} The stats of the latest generation.
     */
    step(steps = 1) {
        for (let i = 0; i < steps; i++) {
            this.population.evolve();
            const stats = this.population.getStats();
            this.history.push(stats);
        }
        return this.history[this.history.length - 1];
    }

    /**
     * Returns the full history of the simulation.
     */
    getHistory() {
        return this.history;
    }

    /**
     * Returns the current state (latest stats).
     */
    getCurrentState() {
        if (this.history.length === 0) {
            return this.population.getStats();
        }
        return this.history[this.history.length - 1];
    }
}

module.exports = Simulation;
