const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  password: String,
  isMajor: Boolean,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.statics.format = (user) => {
  return {
    id: user._id,
    username: user.username,
    name: user.name,
    isMajor: user.isMajor,
    blogs: user.blogs
  }
}

const User = mongoose.model('User', userSchema)

module.exports = User