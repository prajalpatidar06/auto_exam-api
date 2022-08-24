const router = require("express").Router();

router.get("/",(req,res)=>{
    res.send("all good")
})
router.use("/invigilators", require("./invigilators"));
router.use("/evaluators",require('./evaluators'))

module.exports = router;
