const mongoose = require('mongoose')
const DepartmentModel = require('../models/department')

const jobTitleSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true, maxLength: 150 },
  department_id: {
    type: String,
    required: false,
    default: null,
    ref: DepartmentModel,
  },
})

module.exports = mongoose.model('JobTitle', jobTitleSchema)
