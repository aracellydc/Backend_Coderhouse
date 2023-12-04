import { Router } from 'express'
import { getSellers, getSellerById, saveSeller} from '../controllers/sellerControllers.js'

const router = Router()

router.get('/', getSellers);
router.get('/:sid', getSellerById);
router.post('/', saveSeller);

export default router