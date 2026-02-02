const express = require("express");
const router = express.Router();
const controller = require("../controllers/simulation.controller");

router.post("/simulate", controller.simulate);

module.exports = router;
