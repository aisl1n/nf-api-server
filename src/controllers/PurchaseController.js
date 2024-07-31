import Purchase from '../models/Purchase.js';
import Product from '../models/Product.js';

export const createPurchase = async (req, res) => {
  try {
    const { products, total } = req.body;
    const purchase = new Purchase({ products, total });
    await purchase.save();
    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().populate('products');
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
