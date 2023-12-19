import express from 'express';
import * as controllers from '../controllers';
import verifyToken from '../middlewares/verify-token';
import { isAdmin } from '../middlewares/verity-roles';

const router = express.Router();

// router.use(verifyToken);
// router.use(isAdmin);

router.get('/', controllers.getRooms);
router.get('/:id', controllers.getRoomById);
router.post('/', controllers.createNewRoom);
router.put('/:id', controllers.updateRoom);
router.delete('/', controllers.deleteRooms);

module.exports = router;
