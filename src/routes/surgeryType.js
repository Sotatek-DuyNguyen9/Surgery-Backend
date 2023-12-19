import express from 'express';
import * as controllers from '../controllers';
import verifyToken from '../middlewares/verify-token';
import { isAdmin } from '../middlewares/verity-roles';

const router = express.Router();

// router.use(verifyToken);
// router.use(isAdmin);

router.get('/', controllers.getSurgeryTypes);
router.get('/:id', controllers.getSurgeryTypeById);
router.post('/', controllers.createNewSurgeryType);
router.put('/:id', controllers.updateSurgeryType);
router.delete('/', controllers.deleteSurgeryTypes);

module.exports = router;
