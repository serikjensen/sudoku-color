import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AppThemeContext from '../AppThemeContext'

export default class ThemeProvider extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    appTheme: PropTypes.object,
    children: PropTypes.node
  }

  static defaultProps = {
    appTheme: {},
    children: null
  }

  render () {
    const { appTheme, children } = this.props
    return <AppThemeContext.Provider value={appTheme}>{children}</AppThemeContext.Provider>
  }
}
