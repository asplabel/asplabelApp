const mongoose = require('mongoose')
const CardModel = require('../models/card')
const JobTitleModel = require('../models/jobTitle')
const RecordModel = require('../models/record')

const userSchema = mongoose.Schema({
  id: { type: mongoose.Types.ObjectId },
  firstname: { type: String, required: true, maxLength: 80 },
  lastname: { type: String, required: true, maxLength: 80 },
  email: {
    type: String,
    required: false,
    maxLength: 120,
    default: null,
  },
  phone: { type: String, required: false, maxLength: 30 },
  document: { type: String, required: true, maxLength: 20 },
  address: { type: String, required: false, maxLength: 200 },
  date_of_birth: { type: String, require: false },
  is_active: { type: Boolean, required: true },
  job_title_id: {
    type: mongoose.Types.ObjectId,
    required: false,
    default: null,
    ref: JobTitleModel,
  },
  role_id: {
    type: mongoose.Types.ObjectId,
    required: false,
    default: null,
    ref: RecordModel,
  },
  card_id: {
    type: mongoose.Types.ObjectId,
    required: false,
    default: null,
    ref: CardModel,
  },
  type: {
    type: String,
    required: true,
    enum: ['Permanente', 'Temporal', 'Tiempo parcial'],
  },
})

module.exports = mongoose.model('users', userSchema)
