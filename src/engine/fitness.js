function fitness(x, xOpt, sigma) {
    return Math.exp(-Math.pow(x - xOpt, 2) / (2 * sigma * sigma));
}

module.exports = fitness;
