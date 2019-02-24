import React from 'react'
import { ThemeProvider } from 'styled-components'

import AppThemeContext from './AppThemeContext'

import baseTheme from '../../themes/base'

export default (Component, composeTheme = () => ({})) => {
  class Themeable extends React.Component {
    static contextType = AppThemeContext

    render () {
      /* eslint-disable react/prop-types */
      const {
        theme,
        forwardedRef,
        ...props
      } = this.props
      /* eslint-enable react/prop-types */

      const appTheme = getAppTheme(this.context)

      const componentTheme = {
        ...composeTheme(appTheme),
        ...(theme || {})
      }

      const componentProps = {
        theme: componentTheme,
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

const getAppTheme = (context) => {
  // If there's no context or context is empty, fall back to base theme
  if (!context || (Object.keys(context).length === 0 && context.constructor === Object)) {
    return baseTheme
  }

  return context
}
