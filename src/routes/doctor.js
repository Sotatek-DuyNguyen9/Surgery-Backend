import express from "express"
import * as controllers from "../controllers"
import verifyToken from '../middlewares/verify-token'
import { isAdmin } from "../middlewares/verity-roles";

const router = express.Router();

// router.use(verifyToken);
// router.use(isAdmin);

// router.get("/", controllers.getCurrent);
router.get("/", controllers.getDoctors);

module.exports = router;
