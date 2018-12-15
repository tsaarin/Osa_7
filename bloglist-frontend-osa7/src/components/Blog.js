import React from 'react'
import { Button, Form, Header, List, Divider, Icon } from 'semantic-ui-react'

class Blog extends React.Component {
  render() {
    const inlineStyle = {
      marginLeft: 5
    }

    const hideIfNotOwnBlog = { display: this.props.showDelete ? '' : 'none' }
    const name = this.props.blog.user.name ? this.props.blog.user.name : '<No name>'

    return (
      <div>
        <div className='blogInfo'>
          <h2>{this.props.blog.title} by {this.props.blog.author}</h2>
          <div style={{ ...inlineStyle }}>
            <a href={this.props.blog.url}>{this.props.blog.url}</a>
            <Divider fitted />
            <div>
              {this.props.blog.likes} likes
              <Button animated compact size="tiny" className='button' onClick={this.props.likeBlog}>
                <Button.Content visible>
                  <Icon name='thumbs up outline' />
                </Button.Content>
                <Button.Content hidden>like</Button.Content>
              </Button>
            </div>
            <Divider fitted />
            <p> added by {name} </p>
            <Button color='red' style={{ ...hideIfNotOwnBlog }} onClick={this.props.deleteBlog}>Delete</Button>
          </div>
          <Header>Comments</Header>
          <List>
            {this.props.blog.comments.map((comment, index) => (
              <List.Item key={index}>
                <List.Icon name='chat' />
                <List.Content>{comment}</List.Content>
              </List.Item>
            ))}
          </List>
          <Form onSubmit={this.props.submitComment}>
            <Form.Group>
              <Form.Input name='comment' value={this.props.comment} onChange={this.props.onChange} />
            </Form.Group>
            <Form.Button>Add comment</Form.Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default Blog