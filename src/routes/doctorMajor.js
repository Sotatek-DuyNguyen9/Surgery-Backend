import express from 'express';
import * as controllers from '../controllers';
import verifyToken from '../middlewares/verify-token';
import { isAdmin } from '../middlewares/verity-roles';

const router = express.Router();

// router.use(verifyToken);
// router.use(isAdmin);

router.get('/', controllers.getDoctorMajors);
router.get('/:id', controllers.getDoctorMajorById);
router.post('/', controllers.createNewDoctorMajor);
router.put('/:id', controllers.updateDoctorMajor);
router.delete('/', controllers.deleteDoctorMajors);

module.exports = router;
