import React, { Component } from 'react'
import PropTypes from 'prop-types'

import themeable from '../theming/themeable'
import composeTheme from './theme'

import { AppContentStyles } from './styles'

class AppContent extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  static defaultProps = {
    children: null
  }

  render () {
    return <AppContentStyles>{this.props.children}</AppContentStyles>
  }
}

const ThemeableAppContent = themeable(AppContent, composeTheme)

export default ThemeableAppContent
