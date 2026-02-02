const Individual = require('./Individual');

/**
 * Class managing the collection of individuals and evolutionary processes.
 * 
 * Key Mechanisms:
 * 1. Fitness Calculation: Gaussian function (Bell Curve).
 * 2. Selection: Tournament Selection (preserves diversity better than Roulette Wheel).
 * 3. Reproduction: Asexual (cloning with mutation) or Sexual (crossover).
 * 4. Population Dynamics: Logistic Growth (Carrying Capacity K).
 */
class Population {
    constructor(size, config) {
        this.individuals = [];
        this.config = config;
        this.generation = 0;

        // Initialize population with random genotypes around the starting value (0)
        for (let i = 0; i < size; i++) {
            // Random start between -10 and 10
            const startGene = (Math.random() * 20) - 10; 
            this.individuals.push(new Individual(startGene));
        }
    }

    /**
     * Calculates fitness for every individual.
     * Formula: f(x) = exp( -((x - opt)^2) / (2 * sigma^2) )
     * 
     * @returns {void}
     */
    calculateFitness() {
        const opt = this.config.optimalValue;
        const tolerance = this.config.tolerance; // Acts as standard deviation (sigma)

        this.individuals.forEach(ind => {
            const diff = ind.genotype - opt;
            // Gaussian function: Peak is 1.0 when x == opt
            ind.fitness = Math.exp(-(diff * diff) / (2 * tolerance * tolerance));
        });
    }

    /**
     * Selects a parent for the next generation using Tournament Selection.
     * Randomly picks 'k' individuals and chooses the best one.
     * 
     * @returns {Individual} The selected parent.
     */
    selectParent() {
        const tournamentSize = 3;
        let best = null;

        for (let i = 0; i < tournamentSize; i++) {
            const randIndex = Math.floor(Math.random() * this.individuals.length);
            const candidate = this.individuals[randIndex];
            if (best === null || candidate.fitness > best.fitness) {
                best = candidate;
            }
        }
        return best;
    }

    /**
     * Creates the next generation.
     * Combines Evolution (Selection/Mutation) with Ecology (Logistic Growth).
     * 
     * Logistic Growth Formula: N_next = N + r * N * (1 - N/K)
     */
    evolve() {
        this.calculateFitness();

        // 1. Calculate new population size using Logistic Growth
        const N = this.individuals.length;
        const r = this.config.growthRate;
        const K = this.config.carryingCapacity;

        // Change in population size (dN)
        let deltaN = r * N * (1 - N / K);
        
        // Ensure population doesn't drop below 2 or exceed a safe limit
        let nextSize = Math.floor(N + deltaN);
        nextSize = Math.max(2, nextSize); 

        const nextGen = [];

        // 2. Fill the new generation
        for (let i = 0; i < nextSize; i++) {
            // Selection
            const parent = this.selectParent();
            
            // Reproduction (Cloning parent's genotype)
            const offspring = new Individual(parent.genotype);
            
            // Mutation
            offspring.mutate(this.config.mutationRate, this.config.mutationSigma);
            
            nextGen.push(offspring);
        }

        this.individuals = nextGen;
        this.generation++;
    }

    /**
     * Returns statistics of the current generation.
     */
    getStats() {
        const totalFitness = this.individuals.reduce((sum, ind) => sum + ind.fitness, 0);
        const avgFitness = totalFitness / this.individuals.length;
        
        // Find best individual
        const bestInd = this.individuals.reduce((prev, current) => 
            (prev.fitness > current.fitness) ? prev : current
        );

        return {
            generation: this.generation,
            populationSize: this.individuals.length,
            avgFitness: avgFitness,
            bestFitness: bestInd.fitness,
            bestGenotype: bestInd.genotype
        };
    }
}

module.exports = Population;
