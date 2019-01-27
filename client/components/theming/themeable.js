import React from 'react'
import { ThemeProvider } from 'styled-components'

import AppThemeContext from './AppThemeContext'

export default (Component, composeTheme = () => ({})) => {
  class Themeable extends React.Component {
    static contextType = AppThemeContext

    render () {
      const theme = composeTheme(this.context)
      const props = {
        theme,
        appTheme: this.context,
        ...this.props
      }

      return (
        <ThemeProvider theme={() => theme}>
          <Component {...props} />
        </ThemeProvider>
      )
    }
  }

  return Themeable
}
