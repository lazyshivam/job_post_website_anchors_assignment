const mongoose = require("mongoose");
const { toJSON } = require("./plugins");
var mongoosePaginate = require('mongoose-paginate');


const jobSchema = new mongoose.Schema({
  jobRole: {
    type: String,
    required: true,
    unique: true,
  },
  company: { // Reference to the company that posted the role
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  location: {
    type: String,
    required: true,
  },
  minCTC: {
    type: Number,
    required: true,
  },
  maxCTC: {
    type: Number,
    required: true,
  },
});
// Add plugins for JSON conversion and pagination (assuming they are defined elsewhere)
jobSchema.plugin(toJSON);
jobSchema.plugin(mongoosePaginate);


const JobRole = mongoose.model("JobRole", jobSchema);

module.exports = JobRole;
