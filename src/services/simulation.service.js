const Population = require("../engine/Population");

class SimulationService {
    runSimulation(config) {
        const {
            generations,
            initialSize,
            xOpt,
            fitnessSigma,
            K,
            r,
            mutationSigma
        } = config;

        const population = new Population(
            initialSize,
            xOpt,
            fitnessSigma,
            K,
            r,
            mutationSigma
        );

        const history = [];

        for (let gen = 0; gen < generations; gen++) {
            population.step();
            history.push({
                generation: gen,
                ...population.stats()
            });
        }

        return history;
    }
}

module.exports = new SimulationService();
