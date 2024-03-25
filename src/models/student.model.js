const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
var mongoosePaginate = require('mongoose-paginate');

const studentSchema = mongoose.Schema({
  name: { type: String, required: true }, // Name is now required
  email: { type: String, required: true, unique: true }, // Email is required and unique
  phone: { type: String }, // Phone number is optional
  resume: { type: String }, // Resume link or path
  profilePic: { type: String }, // Profile picture link or path
  location: { type: String }, // Student location
  user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  // Rupee related fields
  rupees: { type: Number, default: 300 }, // Starting Rupees balance for students

  // Applied jobs history
  appliedJobs: [{
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' }, // Reference to the Job model
    amountSpent: { type: Number }, // Amount spent on applying for the job
    appliedAt: { type: Date, default: Date.now }, // Date and time of application
  }],

  // Rupee transaction history
  transactionHistory: [{
    type: { type: String, enum: ['credited', 'debited'] }, // Transaction type (credited or debited)
    amount: { type: Number }, // Amount involved in the transaction
    date: { type: Date, default: Date.now }, // Date and time of transaction
    reason: { type: String }, // Reason for the transaction (e.g., registration, job application)
  }],
}, {
  timestamps: true,
});

// Add plugins for JSON conversion and pagination (assuming they are defined elsewhere)
studentSchema.plugin(toJSON);
studentSchema.plugin(mongoosePaginate);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
