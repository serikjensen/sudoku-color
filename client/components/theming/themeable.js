import React from 'react'
import { ThemeProvider, withTheme } from 'styled-components'

import AppThemeContext from './AppThemeContext'

export default (Component, composeTheme) => {
  class Themeable extends React.Component {
    static contextType = AppThemeContext

    render () {
      const ThemedComponent = withTheme(Component)

      return (
        <ThemeProvider theme={() => composeTheme(this.context)}>
          <ThemedComponent {...this.props} />
        </ThemeProvider>
      )
    }
  }

  return Themeable
}
