/**
 * Class representing a single individual in the population.
 * 
 * Scientific Basis:
 * - Genotype (x): A continuous variable representing a specific trait (e.g., beak size, resistance).
 * - Mutation: Modeled as a stochastic process using a Normal Distribution N(0, sigma).
 */
class Individual {
    /**
     * Creates an individual.
     * @param {number} genotype - The genetic value (x).
     */
    constructor(genotype) {
        this.genotype = genotype;
        this.fitness = 0; // Will be calculated based on the environment
    }

    /**
     * Mutates the individual's genotype.
     * Formula: x_new = x + N(0, sigma)
     * 
     * @param {number} rate - Probability of mutation (0.0 to 1.0).
     * @param {number} sigma - Standard deviation of the mutation (magnitude of change).
     */
    mutate(rate, sigma) {
        if (Math.random() < rate) {
            // Box-Muller transform to generate a number from a Normal Distribution
            const u1 = Math.random();
            const u2 = Math.random();
            const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
            
            // Apply mutation
            this.genotype += z * sigma;
        }
    }
}

module.exports = Individual;
