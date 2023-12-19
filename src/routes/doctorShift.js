import express from 'express';
import * as controllers from '../controllers';
import verifyToken from '../middlewares/verify-token';
import { isAdmin } from '../middlewares/verity-roles';

const router = express.Router();

// router.use(verifyToken);
// router.use(isAdmin);

router.get('/', controllers.getDoctorShifts);
router.get('/:id', controllers.getDoctorShiftById);
router.post('/', controllers.createNewDoctorShift);
router.put('/:id', controllers.updateDoctorShift);
router.delete('/', controllers.deleteDoctorShifts);

module.exports = router;
