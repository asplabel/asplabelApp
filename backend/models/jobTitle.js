const mongoose = require('mongoose')
const DepartmentModel = require('../models/department')

const jobTitleSchema = mongoose.Schema({
  id: { type: mongoose.Types.ObjectId },
  name: { type: String, required: true, maxLength: 150 },
  department_id: {
    type: mongoose.Types.ObjectId,
    required: false,
    default: null,
    ref: DepartmentModel,
  },
})

module.exports = mongoose.model('JobTitle', jobTitleSchema)
