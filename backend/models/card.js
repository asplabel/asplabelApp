const mongoose = require('mongoose')

const cardSchema = mongoose.Schema({
  id: { type: String },
  UID: { type: String, required: true, unique: true, maxLength: 10 },
  type: { type: String, required: true, enum: ['Permanente', 'Temporal'] },
  is_active: { type: Boolean, required: true },
  state: { type: String, required: true, enum: ['Ingreso', 'Salida'] },
})

module.exports = mongoose.model('Card', cardSchema)
