import { Router } from 'express'
import { getSales, getSaleById, saveSale} from '../controllers/saleControllers.js'

const router = Router()

router.get('/', getSales);
router.get('/:cid', getSaleById);
router.post('/', saveSale);

export default router