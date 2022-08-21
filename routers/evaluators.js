const router = require("express").Router();
const evaluators_controller = require("../controllers/evaluators_controller");
const { authEvaluator } = require("../middleware/auth");

router.post("/login", evaluators_controller.login_evaluator);
router.post("/assign_marks", authEvaluator, evaluators_controller.assign_marks);

module.exports = router;
