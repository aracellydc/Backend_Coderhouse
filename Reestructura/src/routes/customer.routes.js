import { Router } from 'express'
import { getCustomers, getCustomerById, saveCustomer} from '../controllers/customerControllers.js'

const router = Router()

router.get('/', getCustomers);
router.get('/:cid', getCustomerById);
router.post('/', saveCustomer);

export default router