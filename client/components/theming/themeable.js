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
      const {
        theme,
        forwardedRef,
        ...props
      } = this.props

      const componentTheme = {
        ...composeTheme(this.context),
        ...(theme || {})
      }

      const componentProps = {
        theme: componentTheme,
        appTheme: this.context,
        ref: forwardedRef,
        ...props
      }

      return (
        <ThemeProvider theme={() => componentTheme}>
          <Component {...componentProps} />
        </ThemeProvider>
      )
    }
  }

  function forwardRef (props, ref) {
    return <Themeable {...props} forwardedRef={ref} />
  }

  const name = Component.displayName || Component.name
  forwardRef.displayName = `themeable(${name})`

  return React.forwardRef(forwardRef)
}
