import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import themeable from '../../theming/themeable'
import composeTheme from './theme'
import { DefaultFacadeStyles } from './styles'

export const testSelector = 'data-sudoku-color-tile-default'

class DefaultFacade extends PureComponent {
  static propTypes = {
    value: PropTypes.number,
    elementRef: PropTypes.func,
    children: PropTypes.node
  }

  static defaultProps = {
    value: null,
    elementRef: () => {},
    children: null
  }

  render () {
    const { elementRef, ...props } = this.props

    const defaultFacadeProps = {
      [testSelector]: true,
      ...props
    }

    return <DefaultFacadeStyles ref={elementRef} {...defaultFacadeProps} />
  }
}

export default themeable(DefaultFacade, composeTheme)
