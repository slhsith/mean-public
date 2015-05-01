var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
  firstName: {type: String, lowercase: true, unique: true},
  lastName: {type: String, lowercase: true, unique: true},
  company: String,
  phone: String,
  email: String,
  billingAddress: String,
  shippingAddress: String,
  customer_id: {type: String, lowercase: true, unique: true},
  transaction: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

CustomerSchema.methods.createCustomerId = function() {
  this.customer_id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 30);
}


mongoose.model('Customer', CustomerSchema);