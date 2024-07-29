import mongoose from 'mongoose';

const PurchaseSchema = new mongoose.Schema({
  market: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Market',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  }],
  total: {
    type: Number,
    required: true,
  },
});

const Purchase = mongoose.model('Purchase', PurchaseSchema);

export default Purchase;
