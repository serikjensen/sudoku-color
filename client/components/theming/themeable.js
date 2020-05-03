import React from 'react'
import PropTypes from 'prop-types'
import deepmerge from 'deepmerge'
import { ThemeProvider } from 'emotion-theming'

import AppThemeContext from './AppThemeContext'

import baseTheme from '../../themes/base'

export default (Component, composeTheme = () => ({})) => {
  class Themeable extends React.PureComponent {
    static propTypes = {
      theme: PropTypes.object,
      forwardedRef: PropTypes.func
    }

    static defaultProps = {
      theme: {},
      forwardedRef: () => {}
    }

    static contextType = AppThemeContext

    render () {
      const {
        theme,
        forwardedRef,
        ...props
      } = this.props

      const appTheme = getAppTheme(this.context)

      const componentTheme = deepmerge(composeTheme(appTheme), theme)

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
