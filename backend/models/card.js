const mongoose = require('mongoose')

const cardSchema = mongoose.Schema({
  _id: { type: String },
  UID: { type: String, required: true, unique: true, maxLength: 10 },
  type: {
    type: String,
    required: true,
    enum: ['Permanente', 'Temporal'],
    default: 'Permanente',
  },
  is_active: { type: Boolean, required: true, default: true },
  state: {
    type: String,
    required: true,
    enum: ['Ingreso', 'Salida'],
    default: 'Salida',
  },
  is_user: { type: Boolean, required: true, default: false },
})

module.exports = mongoose.model('Card', cardSchema)
