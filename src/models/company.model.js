const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
var mongoosePaginate = require('mongoose-paginate');

const companySchema = mongoose.Schema({
  name: { type: String, required: true }, 
  user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  rupees: { type: Number, default: 200 },
  website: { type: String }, 
  teamSize: { type: String, enum: ['1-10', '11-50', '50+'] },
  logo: { type: String },

  // Rupee transaction history
  transactionHistory: [{
    type: { type: String, enum: ['credited', 'debited'] }, 
    amount: { type: Number },
    date: { type: Date, default: Date.now }, 
    reason: { type: String }, 
  }],
}, {
  timestamps: true,
});

// Add plugins for JSON conversion and pagination (assuming they are defined elsewhere)
companySchema.plugin(toJSON);
companySchema.plugin(mongoosePaginate);

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
