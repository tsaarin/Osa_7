import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import User from './components/User'
import { connect } from 'react-redux'
import { notify } from './reducers/notificationReducer'
import { initializeBlogs, createNewBlog, deleteBlog, likeBlog, commentBlog } from './reducers/blogReducer'
import { loginUser, logoutUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Menu, Header, Icon, Table } from 'semantic-ui-react'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      title: '',
      author: '',
      url: '',
      comment: ''
    }
  }

  componentDidMount() {
    this.props.initializeBlogs()
    this.props.initializeUsers()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log('logged user: ', loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      this.props.loginUser(user)
    }
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.blogs) !== JSON.stringify(prevProps.blogs)) {
      this.props.initializeBlogs()
    }
  }

  handleFieldChange = (event) => {
    console.log('Event target: ', event.target)
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLikeIncrease = (id) => {
    return () => {
      const blog = this.props.blogs.find(blog => blog.id === id)
      const updatedBlog = { ...blog, user: blog.user._id, likes: blog.likes + 1 }

      this.props.likeBlog(updatedBlog)
    }
  }

  submitComment = (id) => {
    return () => {
      const commentedBlog = this.props.blogs.find(blog => blog.id === id)
      const newComment = this.state.comment
      this.props.commentBlog(id, commentedBlog.comments.concat(newComment))
        .then(() => {
          return this.setState({ comment: '' })
        })
      this.props.notify(`Comment '${newComment}' added to blog '${commentedBlog.title}'`, 5000)

    }

  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      this.setState({ username: '', password: '' })
      this.props.loginUser(user)
    } catch (exception) {
      this.props.notify('Username or password incorrect', 5000)
    }
  }

  logout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({ title: '', author: '', url: '' })
    this.props.logoutUser()
  }

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title ? this.state.title : undefined,
      author: this.state.author ? this.state.author : undefined,
      url: this.state.url ? this.state.url : undefined
    }
    this.props.createNewBlog(blogObject)
      .then(() => {
        return this.setState({
          title: '',
          author: '',
          url: ''
        })
      })
      .then(() => {
        this.props.notify(`a new blog '${blogObject.title}' by ${blogObject.author} added`, 5000)
      })
      .catch((error) => {
        this.props.notify(error.response.data.error, 10000)
      })
  }

  deleteBlog = (id, history) => {
    return () => {
      const blog = this.props.blogs.find(blog => blog.id === id)
      if (window.confirm(`delete '${blog.title}' by ${blog.author}?`)) {
        this.props.deleteBlog(id)
          .then(() => {
            history.push('/')
            this.props.notify('Blog deleted', 5000)
          })
          .catch(() => {
            this.props.notify('unauthorized to delete blog', 5000)
          })
      }
    }
  }

  userById = (id) => {
    return this.props.users.find(user => user.id === id)
  }

  blogById = (id) => {
    return this.props.blogs.find(blog => blog.id === id)
  }

  render() {
    console.log('users logged in: ', this.props.users)
    const loginForm = () => (
      <div>
        <h2>Log in to application</h2>
        <LoginForm
          username={this.state.username}
          password={this.state.password}
          onSubmit={this.login}
          handleChange={this.handleFieldChange}
        />
      </div>
    )

    const blogForm = () => (
      <div>
        <Togglable buttonLabel="Create new" id="create-blog-button">
          <BlogForm
            title={this.state.title}
            author={this.state.author}
            url={this.state.url}
            onSubmit={this.addBlog}
            onChange={this.handleFieldChange}
          />
        </Togglable>
        <br />
      </div>
    )

    const blogPanelStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const blogList = () => (
      <div>
        {this.props.blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <div key={blog.id} style={blogPanelStyle}>
              <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
            </div>
          ))
        }
      </div>
    )

    const users = () => (
      <div>
        <h2>Users</h2>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>User</Table.HeaderCell>
              <Table.HeaderCell>Blogs added</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.users
              .map(user => (
                <Table.Row key={user.id}>
                  <Table.Cell><Link to={`/users/${user.id}`}>{user.username}</Link></Table.Cell>
                  <Table.Cell>{user.blogs.length}</Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      </div>
    )

    const siteContent = () => (
      <div>
        <Router>
          <div>
            <Menu inverted >
              <Menu.Item>
                <Header color="blue">Blog App</Header>
              </Menu.Item>
              <Menu.Item link>
                <Link to="/blogs">blogs</Link>
              </Menu.Item>
              <Menu.Item link>
                <Link to="/users">users</Link>
              </Menu.Item>

              <Menu.Menu position='right'>
                <Menu.Item>
                  {this.props.user.username} logged in
                </Menu.Item>
                <Menu.Item onClick={this.logout}>
                  <Icon name='sign out' />
                  Logout
                </Menu.Item>
              </Menu.Menu>
            </Menu>

            { blogForm() }

            <Route exact path="/" render={() => blogList()} />
            <Route exact path="/users" render={() => users()} />
            <Route exact path="/users/:id" render={({ match }) =>
              <User user={this.userById(match.params.id)} />}
            />
            <Route exact path="/blogs" render={() => blogList()} />
            <Route exact path="/blogs/:id" render={({ match, history }) => {
              const blog = this.blogById(match.params.id)
              if (!blog) {
                return null
              }
              return (
                <Blog
                  blog={blog}
                  likeBlog={this.handleLikeIncrease(blog.id)}
                  deleteBlog={this.deleteBlog(blog.id, history)}
                  showDelete={!blog.user.name || this.props.user.username === blog.user.username}
                  onChange={this.handleFieldChange}
                  comment={this.state.comment}
                  submitComment={this.submitComment(blog.id)}
                />
              )
            }}
            />
          </div>
        </Router>
      </div>
    )

    return (
      <Container>
        <Notification />
        { this.props.user === null ? loginForm() : siteContent() }
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  { notify, initializeBlogs, createNewBlog, deleteBlog, likeBlog, commentBlog, loginUser, logoutUser, initializeUsers }
)(App)
