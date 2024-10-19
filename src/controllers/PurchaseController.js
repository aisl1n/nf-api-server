import Purchase from "../models/Purchase.js";
import dayjs from "dayjs";

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
    console.log(error.message);
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

export const getPurchaseById = async (req, res) => {
  try {
    const purchaseId = req.params.id;
    const purchase = await Purchase.findById(purchaseId).populate("products");
    if (!purchase) {
      return res.status(404).json({ message: "Compra não encontrada" });
    }
    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ message: "Compra não encontrada" });
  }
};

export const getPurchaseByMonth = async (req, res) => {
  try {
    const { month } = req.params;
    const currentYear = dayjs().year();
    const formattedMonth = String(month).padStart(2, "0");
    const startOfMonth = dayjs(`${currentYear}-${formattedMonth}-02`).startOf("day").toDate();
    const endOfMonth = dayjs(`${currentYear}-${formattedMonth}-02`).add(1, "month").startOf("day").toDate();

    console.log("startOfMonth", startOfMonth);
    console.log("endOfMonth", endOfMonth);

    const purchases = await Purchase.find({
      date: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    }).populate("products");

    res.status(200).json(purchases);
  } catch (error) {
    console.error("Erro ao buscar compras:", error);
    res.status(500).json({ message: "Erro ao buscar compras" });
  }
};

export const deletePurchase = async (req, res) => {
  try {
    const purchaseId = req.params.id;
    await Purchase.findByIdAndDelete(purchaseId);
    res.status(200).json({ message: "Compra deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
