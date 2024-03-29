import express from 'express';
import * as controllers from '../controllers';
import verifyToken from '../middlewares/verify-token';
import { isAdmin } from '../middlewares/verity-roles';

const router = express.Router();

// router.use(verifyToken);
// router.use(isAdmin);

// router.get("/", controllers.getCurrent);
router.get('/', controllers.getDoctors);
router.put('/:id', controllers.updateDoctor);
router.delete('/', controllers.deleteDoctors);

module.exports = router;
