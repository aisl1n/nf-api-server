import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const produtos = req.body;
    const docs = [];
    produtos.forEach((produto) => {
      const newProductDoc = new Product({
        name: produto.name,
        quantity: produto.quantity,
        price: produto.price,
      });
      docs.push(newProductDoc);
    });
    await Product.insertMany(docs);
    const productsId = docs.map((doc) => doc._id);
    res.status(201).json(productsId);
  } catch (error) {
    console.error("Erro ao salvar os produtos:", error);
    res.status(500).json({ error: "Falha ao salvar os produtos" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    // const productsIds = products.map((product) => product._id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Produto deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
