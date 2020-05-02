import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  ScreenReaderContent,
  PresentationContent
} from '@instructure/ui-a11y-content'

import Button from '../Button'

import themeable from '../theming/themeable'
import composeTheme from './theme'

class IconButton extends PureComponent {
  static propTypes = {
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    label: PropTypes.node,
    margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.oneOf(['primary', 'secondary', 'neutral'])
  }

  static defaultProps = {
    icon: () => null,
    label: null,
    margin: 0,
    color: 'primary'
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
      label,
      icon,
      Icon = icon, // eslint-disable-line react/prop-types
      ...props
    } = this.props

    const buttonProps = {
      shape: 'rectangular',
      ref: this.handleButtonRef,
      ...props
    }

    return (
      <Button {...buttonProps}>
        <ScreenReaderContent>{label}</ScreenReaderContent>
        <PresentationContent><Icon /></PresentationContent>
      </Button>
    )
  }
}

export default themeable(IconButton, composeTheme)
