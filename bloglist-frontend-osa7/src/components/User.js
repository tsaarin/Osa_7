import React from 'react'
import { Header, List } from 'semantic-ui-react'

const User = ({ user }) => {
  console.log('Rendering blogs from user: ', user)
  if (!user) {
    return null
  }
  const name = user.name ? user.name : '<No name>'
  return (
    <div>
      <Header>Blogs added by {name}</Header>
      <List>
        {user.blogs.map(blog => (
          <List.Item key={blog._id}>
            <List.Icon name='book' />
            <List.Content>
              {blog.title} by {blog.author}
            </List.Content>
          </List.Item>
        ))}
      </List>
    </div>
  )
}

export default User