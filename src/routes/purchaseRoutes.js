import express from 'express';
import { createPurchase, getPurchases } from '../controllers/purchaseController.js';

const router = express.Router();

router.post('/', createPurchase);
router.get('/', getPurchases);

export default router;
