import Purchase from "../models/Purchase.js";

export const createPurchase = async (req, res) => {
  try {
    const { produtos, valorTotalNumber, nomeLoja, dataCompra } = req.body;

    console.log("produtos que chegaram: ", produtos);
    console.log("valor total que chegou: ", valorTotalNumber);
    console.log("nome da loja que chegou: ", nomeLoja);
    console.log("data da compra que chegou: ", dataCompra);

    const purchase = new Purchase({ market: nomeLoja, date: dataCompra, products: produtos, total: valorTotalNumber });
    await purchase.save();
    res.status(201).json(purchase);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message });
  }
};

export const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().populate("products");
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
