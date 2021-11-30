const mongoose = require('mongoose')

const departmentSchema = mongoose.Schema({
  id: { type: mongoose.Types.ObjectId },
  name: { type: String, required: true, unique: true, maxLength: 150 },
})

module.exports = mongoose.model('departments', departmentSchema)
