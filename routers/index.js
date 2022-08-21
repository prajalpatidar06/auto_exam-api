const router = require("express").Router();

router.use("/invigilators", require("./invigilators"));
router.use("/evaluators",require('./evaluators'))

module.exports = router;
