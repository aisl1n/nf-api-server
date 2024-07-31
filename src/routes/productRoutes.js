import express from "express";
import { createProduct, deleteProduct, getProducts } from "../controllers/ProductController.js";

const router = express.Router()

router.post('/', createProduct);
router.get('/', getProducts);
router.delete('/:id', deleteProduct);

export default router;
