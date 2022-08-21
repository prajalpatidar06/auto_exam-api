const router = require("express").Router();
const invigilators_controller = require("../controllers/invigilators_controller");
const { authInvigilator } = require("../middleware/auth");

router.post("/login", invigilators_controller.login_invigilator);
router.post(
  "/admit_card",
  authInvigilator,
  invigilators_controller.verifyAdmitCard
);
router.post(
  "/sheets/main",
  authInvigilator,
  invigilators_controller.assignMainSheet
);
router.post(
  "/sheets/extras",
  authInvigilator,
  invigilators_controller.assignExtraSheet
);
module.exports = router;
