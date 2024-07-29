import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const product = new Product({ name, price, quantity });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProducts = async (req, res) => {
  const { produtos } = req.body;
  try {
    const docs = [];
    produtos.forEach((produto) => {
      const newProductDoc = new Product({
        name: produto.name,
        quantity: produto.quantity,
        price: produto.price,
      });
      docs.push(newProductDoc);
    });
    await Produto.insertMany(docs);
    res.status(201).json({ message: "Produtos salvos com sucesso" });
  } catch (error) {
    console.error("Erro ao salvar os produtos:", error);
    res.status(500).json({ error: "Falha ao salvar os produtos" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
