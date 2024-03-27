const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
var mongoosePaginate = require('mongoose-paginate');

const studentSchema = mongoose.Schema({
  name: { type: String, required: true }, 
  email: { type: String, required: true,  }, 
  phone: { type: String }, 
  resume: { type: String }, 
  profilePic: { type: String }, 
  location: { type: String }, 
  user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  // Rupee related fields
  rupees: { type: Number, default: 300 }, 

  // Applied jobs history
  appliedJobs: [{
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' }, 
    amountSpent: { type: Number }, 
    appliedAt: { type: Date, default: Date.now }, 
  }],

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
studentSchema.plugin(toJSON);
studentSchema.plugin(mongoosePaginate);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
