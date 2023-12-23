import express from 'express';
import * as controllers from '../controllers';
import verifyToken from '../middlewares/verify-token';
import { isAdmin } from '../middlewares/verity-roles';

const router = express.Router();

// router.use(verifyToken);
// router.use(isAdmin);

router.get('/', controllers.getSettings);
router.get('/:id', controllers.getSettingById);
router.post('/', controllers.createNewSetting);
router.put('/:id', controllers.updateSetting);
router.delete('/', controllers.deleteSettings);

module.exports = router;
