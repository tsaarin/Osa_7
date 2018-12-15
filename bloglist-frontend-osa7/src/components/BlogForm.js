import React from 'react'
import { Form } from 'semantic-ui-react'

const BlogForm = ({ title, author, url, onSubmit, onChange }) => {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Input name='title' value={title} label='Title' placeholder='Title' onChange={onChange} />
        <Form.Input name='author' value={author} label='Author' placeholder='Author' onChange={onChange} />
        <Form.Input name='url' value={url} label='Url' placeholder='Url' onChange={onChange} />
      </Form.Group>
      <Form.Button>Submit</Form.Button>
    </Form>
  )
}

export default BlogForm