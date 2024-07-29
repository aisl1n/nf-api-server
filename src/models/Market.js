import mongoose from 'mongoose';

const MarketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

const Market = mongoose.model('Market', MarketSchema);

export default Market;
