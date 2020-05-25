import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Focusable from '../util/Focusable'
import FocusRing from '../FocusRing'

import themeable from '../theming/themeable'
import composeTheme from './theme'
import { ButtonStyles } from './styles'

class Button extends PureComponent {
  _buttonRef = null

  static propTypes = {
    children: PropTypes.node,
    color: PropTypes.oneOf(['primary', 'secondary', 'neutral']),
    shape: PropTypes.oneOf(['circular', 'rectangular']),
    display: PropTypes.oneOf(['inline', 'block']),
    margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    size: PropTypes.oneOf(['small', 'medium'])
  }

  static defaultProps = {
    children: null,
    color: 'primary',
    shape: 'circular',
    display: 'inline',
    margin: 0,
    size: 'medium'
  }

  handleButtonRef = (el) => {
    this._buttonRef = el
  }

  focus () {
    this._buttonRef.focus()
  }

  render () {
    const {
      shape,
      children,
      size,
      ...props
    } = this.props

    const buttonProps = {
      shape,
      size,
      type: 'button',
      ref: this.handleButtonRef,
      ...props
    }

    const renderButton = ({ getFocusableProps, focused }) => (
      <ButtonStyles {...getFocusableProps(buttonProps)}>
        {children}
        <FocusRing
          shape={shape}
          focused={focused}
        />
      </ButtonStyles>
    )

    return <Focusable render={renderButton} />
  }
}

export default themeable(Button, composeTheme)
