const mongoose = require('mongoose')

const RoleSchema = mongoose.Schema({
  id: { type: mongoose.Types.ObjectId },
  name: { type: String, unique: true, required: true, maxLength: 100 },
  description: { type: String, required: false, maxLength: 350 },
})

module.exports = mongoose.model('roles', RoleSchema)
