const mongoose = require('mongoose')

const RoleSchema = mongoose.Schema({
  id: { type: mongoose.Types.ObjectId },
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: false, maxLength: 350 },
})

module.exports = mongoose.model('Role', RoleSchema)
