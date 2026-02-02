const Population = require("./src/engine/Population");

const pop = new Population(
    50,   // initial size
    5,    // xOpt
    1,    // fitness sigma
    200,  // K
    0.2,  // r
    0.3   // mutation sigma
);

for (let gen = 0; gen < 50; gen++) {
    pop.step();
    const stats = pop.stats();
    console.log(
        `Gen ${gen} | N=${stats.size} | avgGene=${stats.avgGene.toFixed(2)}`
    );
}
