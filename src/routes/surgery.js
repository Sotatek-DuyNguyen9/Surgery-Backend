import express from 'express';
import * as controllers from '../controllers';
import verifyToken from '../middlewares/verify-token';
import { isAdmin } from '../middlewares/verity-roles';

const router = express.Router();

// router.use(verifyToken);
// router.use(isAdmin);

router.get('/', controllers.getSurgeries);
router.get('/:id', controllers.getSurgeryById);
router.post('/', controllers.createNewSurgery);
router.put('/:id', controllers.updateSurgery);
router.delete('/', controllers.deleteSurgeries);

module.exports = router;
