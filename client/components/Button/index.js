import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Focusable from '../util/Focusable'
import FocusRing from '../FocusRing'

import themeable from '../theming/themeable'
import composeTheme from './theme'
import { ButtonStyles } from './styles'

class Button extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    color: PropTypes.oneOf(['primary', 'secondary', 'neutral']),
    shape: PropTypes.oneOf(['circular', 'rectangular']),
    display: PropTypes.oneOf(['inline', 'block']),
    margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

  static defaultProps = {
    children: null,
    color: 'primary',
    shape: 'circular',
    display: 'inline',
    margin: 0
  }

  _buttonRef = null

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
      ...props
    } = this.props

    const buttonProps = {
      shape,
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
