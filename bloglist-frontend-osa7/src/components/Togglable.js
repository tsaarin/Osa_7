import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'semantic-ui-react'

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <Button animated onClick={this.toggleVisibility}>
            <Button.Content visible>{this.props.buttonLabel}</Button.Content>
            <Button.Content hidden>
              <Icon name='plus square' />
            </Button.Content>
          </Button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <Button onClick={this.toggleVisibility}>Cancel</Button>
        </div>
      </div>
    )
  }
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable