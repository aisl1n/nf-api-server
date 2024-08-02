import express from 'express';
import { createPurchase, deletePurchase, getPurchaseById, getPurchases } from '../controllers/PurchaseController.js';

const router = express.Router();

router.post('/', createPurchase);
router.get('/', getPurchases);
router.get('/:id', getPurchaseById);
router.delete('/:id', deletePurchase);

export default router;
