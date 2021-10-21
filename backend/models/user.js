const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  id: { type: String },
  firstname: { type: String, required: true, maxLength: 80 },
  lastname: { type: String, required: true, maxLength: 80 },
  email: { type: String, required: false, unique:true, maxLength: 120 },
  phone: { type: String, required: false, maxLength: 30},
  document: { type: String, required: true, maxLength: 20},
  address: { type: String, required: false, maxLength: 30},
  date_of_birth: { type: Date, require: false, },
  is_active: { type: Boolean, required: true },
  job_title_id: {type: String, required: false},
  role_id: {type: String, required: false},
  card_id: {type: String, rquired: false},
  type: { type: String, required: true, enum: ['Permanente', 'Temporal', 'Tiempo parcial'] }
})

module.exports = mongoose.model('User', userSchema)