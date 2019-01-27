import React from 'react'
import { ThemeProvider } from 'styled-components'

import AppThemeContext from './AppThemeContext'

export default (Component, composeTheme = () => ({})) => {
  class Themeable extends React.Component {
    static contextType = AppThemeContext

    handleComponentRef = (el) => {
      const { componentRef } = this.props

      if (typeof componentRef === 'function') {
        componentRef(el)
      }
    }

    render () {
      const theme = composeTheme(this.context)

      const {
        componentRef,
        ...props
      } = this.props

      const componentProps = {
        theme,
        appTheme: this.context,
        ref: this.handleComponentRef,
        ...props
      }

      return (
        <ThemeProvider theme={() => theme}>
          <Component {...componentProps} />
        </ThemeProvider>
      )
    }
  }

  return Themeable
}
