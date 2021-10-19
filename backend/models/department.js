const mongoose = require('mongoose')

const departmentSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true, maxLength: 80 },
})

module.exports = mongoose.model('Department', departmentSchema)
