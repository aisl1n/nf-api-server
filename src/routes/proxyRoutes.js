import express from 'express';
import { proxyRequest } from '../controllers/ProxyController.js';

const router = express.Router();

router.get('/', proxyRequest);

export default router;
