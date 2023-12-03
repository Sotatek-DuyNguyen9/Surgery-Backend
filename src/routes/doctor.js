const router = require("express").Router();
const doctorController = require("../controllers/doctor");

router.get("/", doctorController.getDoctors);

module.exports = router;
