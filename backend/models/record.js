const mongoose = require('mongoose')

const recordSchema = mongoose.Schema({
  id: { type: mongoose.Types.ObjectId },
  firstname: { type: String, required: true, maxLength: 80 },
  lastname: { type: String, required: true, maxLength: 80 },
  date: { type: String, require: true },
  time: { type: String, require: true },
  type: { type: String, required: true, enum: ['Ingreso', 'Salida'] },
})

module.exports = mongoose.model('Record', recordSchema)
