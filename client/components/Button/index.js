import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FocusRing from '../FocusRing'

import themeable from '../theming/themeable'
import composeTheme from './theme'
import { ButtonStyles } from './styles'

class Button extends Component {
  static propTypes = {
    children: PropTypes.node,
    color: PropTypes.oneOf(['primary', 'secondary']),
    display: PropTypes.oneOf(['inline', 'block']),
    margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

  static defaultProps = {
    children: null,
    color: 'primary',
    display: 'inline',
    margin: 0
  }

  render () {
    const {
      children,
      ...props
    } = this.props

    return (
      <ButtonStyles {...props}>
        {children}
        <FocusRing shape="circular" />
      </ButtonStyles>
    )
  }
}

export default themeable(Button, composeTheme)
