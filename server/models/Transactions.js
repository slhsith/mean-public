var mongoose = require('mongoose');

var TransactionSchema = new mongoose.Schema({
  amount: Number,
  firstName: {type: String, lowercase: true, unique: true},
  lastName: {type: String, lowercase: true, unique: true},
  company: String,
  phone: String,
  email: String,
  transaction_id: {type: String, lowercase: true, unique: true},
  customer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }],
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
});

TransactionSchema.methods.createTransactionId = function() {
  this.transaction_id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 30);
}


mongoose.model('Transaction', TransactionSchema);