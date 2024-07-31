import mongoose from 'mongoose';

const PurchaseSchema = new mongoose.Schema({
  market: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
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
