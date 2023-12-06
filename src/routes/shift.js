import express from "express";
import * as controllers from "../controllers";
import verifyToken from "../middlewares/verify-token";
import { isAdmin } from "../middlewares/verity-roles";

const router = express.Router();

// router.use(verifyToken);
// router.use(isAdmin);

router.get("/", controllers.getShifts);
router.post("/", controllers.createNewShift);
router.put("/:id", controllers.updateShift);
router.delete("/", controllers.deleteShifts);

module.exports = router;
