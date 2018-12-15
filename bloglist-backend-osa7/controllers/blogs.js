const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })
    response.json(blogs.map(Blog.format))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'unexpected error' })
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (body.title === undefined || body.url === undefined) {
      return response.status(400).json({ error: 'Invalid blog information' })
    }

    body.likes = body.likes === undefined ? 0 : body.likes
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id,
      comments: []
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(Blog.format(blog))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'unexpected error' })
    }
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    const currentUser = await User.findById(decodedToken.id)

    if (blog.user.name === undefined || blog.user._id.toString() === currentUser._id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      response.status(403).json({ error: 'unauthorized delete attempt' })
    }
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'unexpected error' })
    }
  }
})

blogsRouter.put('/:id', (request, response) => {
  console.log('Received PUT request')
  const body = request.body
  console.log('Request Body: ', body)

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user
  }

  Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      return Blog.format(updatedBlog)
    })
    .then(updatedAndFormattedBlog => {
      response.json(updatedAndFormattedBlog)
    })
    .catch((err) => {
      console.log(err)
      response.status(400).send({ error: 'bad id' })
    })
})

blogsRouter.post('/:id/comments', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)
    console.log('Found blog: ', blog)
    console.log('Assigning comments: ', request.body.comments)
    blog.comments = request.body.comments
    await blog.save()

    console.log('Returning blog: ', blog)
    return response.json(blog)

  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'unexpected error' })
  }
})

module.exports = blogsRouter
