const simulationService = require("../services/simulation.service");

exports.simulate = (req, res) => {
    try {
        const result = simulationService.runSimulation(req.body);
        res.json({
            success: true,
            data: result
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};
