var mongoose = require('mongoose');

var TransactionSchema = new mongoose.Schema({
  amount: Number,
  paymentMethodNonce: String,
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' }
});


mongoose.model('Transaction', TransactionSchema);