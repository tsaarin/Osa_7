import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

const LoginForm = ({ username, password, onSubmit, handleChange }) => {
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Input name='username' value={username} label='Username' onChange={handleChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Input name='password' value={password} label='Password' onChange={handleChange}/>
        </Form.Group>
        <Form.Button>Login</Form.Button>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default LoginForm