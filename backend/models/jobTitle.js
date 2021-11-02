const mongoose = require('mongoose')

const jobTitleSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true, maxLength: 150 },
  department_id: { type: String, required: false, default: null },
})

module.exports = mongoose.model('JobTitle', jobTitleSchema)
