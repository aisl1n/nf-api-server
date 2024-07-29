import Market from '../models/Market.js';

export const createMarket = async (req, res) => {
  try {
    const { name } = req.body;
    const market = new Market({ name });
    await market.save();
    res.status(201).json(market);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMarkets = async (req, res) => {
  try {
    const markets = await Market.find();
    res.status(200).json(markets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
