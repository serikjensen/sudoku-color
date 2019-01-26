import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AppThemeContext from '../AppThemeContext'

export default class ThemeProvider extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    theme: PropTypes.object,
    children: PropTypes.node
  }

  static defaultProps = {
    theme: {},
    children: null
  }

  render () {
    const { theme, children } = this.props
    return <AppThemeContext.Provider value={theme}>{children}</AppThemeContext.Provider>
  }
}
