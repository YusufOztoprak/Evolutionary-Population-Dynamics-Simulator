// stage1.js

// --- PARAMETRELER ---
const POPULATION_SIZE = 100;
const GENERATIONS = 20;

const X_OPT = 0.6;     // çevrenin ideal genetik değeri
const SIGMA = 0.1;     // çevresel tolerans

// --- FITNESS FONKSİYONU ---
function fitness(x) {
    return Math.exp(-Math.pow(x - X_OPT, 2) / (2 * SIGMA * SIGMA));
}

// --- BAŞLANGIÇ POPÜLASYONU ---
let population = Array.from({ length: POPULATION_SIZE }, () => Math.random());

// --- SEÇİLİM ---
function select(pop) {
    const fitnesses = pop.map(fitness);
    const totalFitness = fitnesses.reduce((a, b) => a + b, 0);

    const probabilities = fitnesses.map(f => f / totalFitness);

    const newPopulation = [];

    for (let i = 0; i < pop.length; i++) {
        let r = Math.random();
        let acc = 0;

        for (let j = 0; j < pop.length; j++) {
            acc += probabilities[j];
            if (r <= acc) {
                newPopulation.push(pop[j]);
                break;
            }
        }
    }

    return newPopulation;
}

// --- SİMÜLASYON ---
for (let g = 0; g < GENERATIONS; g++) {
    const avg =
        population.reduce((a, b) => a + b, 0) / population.length;

    console.log(
        `Generation ${g}: avg gene = ${avg.toFixed(3)}`
    );

    population = select(population);
}

