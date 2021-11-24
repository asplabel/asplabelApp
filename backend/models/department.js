const mongoose = require('mongoose')

const departmentSchema = mongoose.Schema({
  id: { type: mongoose.Types.ObjectId },
  name: { type: String, required: true, maxLength: 80 },
})

module.exports = mongoose.model('departments', departmentSchema)
