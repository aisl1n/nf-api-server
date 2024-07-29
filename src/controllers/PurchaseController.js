import Purchase from '../models/Purchase.js';
import Product from '../models/Product.js';

export const createPurchase = async (req, res) => {
  try {
    const { products } = req.body;

    // Calculate the total price
    let total = 0;
    // for (const productId of products) {
    //   const product = await Product.findById(productId);
    //   if (product) {
    //     total += product.price * product.quantity;
    //   } else {
    //     return res.status(404).json({ message: `Product with ID ${productId} not found` });
    //   }
    // }

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
