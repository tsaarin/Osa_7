const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: Array
})

blogSchema.statics.format = (blog) => {
  return {
    id: blog._id,
    user: blog.user,
    likes: blog.likes,
    author: blog.author,
    title: blog.title,
    url: blog.url,
    comments: blog.comments
  }
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog