import express from 'express';
import { createMarket, getMarkets } from '../controllers/MarketController.js';

const router = express.Router();

router.post('/', createMarket);
router.get('/', getMarkets);

export default router;
