import React, { Component } from 'react'

import { expect, mount } from '@instructure/ui-test-utils'

import themeable from '../themeable'
import AppThemeProvider from '../AppThemeProvider'

/* eslint-disable react/no-multi-comp */
describe('themeable', async () => {
  it('should pass the theme to the themed component via props', async () => {
    class Foo extends Component {
      render () {
        return <div>hello world</div>
      }
    }
    const composeTheme = () => ({
      background: 'black',
      margin: '10rem'
    })

    const ThemeableFoo = themeable(Foo, composeTheme)

    let component = null
    await mount(<ThemeableFoo componentRef={(el) => { component = el }} />)

    expect(component.props.theme).to.deep.equal(composeTheme())
  })

  it('should receive the app theme from AppThemeProvider', async () => {
    class Foo extends Component {
      render () {
        return <div>hello world</div>
      }
    }

    const theme = {
      primaryColor: 'blue',
      spacing: '5rem'
    }

    const composeTheme = ({ primaryColor, spacing }) => ({
      borderColor: primaryColor,
      padding: spacing
    })

    const ThemeableFoo = themeable(Foo, composeTheme)

    let component = null
    await mount(
      <AppThemeProvider theme={theme}>
        <ThemeableFoo ref={(el) => { component = el }} />
      </AppThemeProvider>
    )

    expect(component.props.theme).to.deep.equal({
      borderColor: 'blue',
      padding: '5rem'
    })
  })

  it('should override app theme via theme prop', async () => {
    class Foo extends Component {
      render () {
        return <div>hello world</div>
      }
    }

    const theme = {
      primaryColor: 'blue',
      spacing: '5rem'
    }

    const composeTheme = ({ primaryColor, spacing }) => ({
      borderColor: primaryColor,
      padding: spacing
    })

    const ThemeableFoo = themeable(Foo, composeTheme)

    let component = null
    await mount(
      <AppThemeProvider theme={theme}>
        <ThemeableFoo
          ref={(el) => { component = el }}
          theme={{ borderColor: 'green', padding: '7rem' }}
        />
      </AppThemeProvider>
    )

    expect(component.props.theme).to.deep.equal({
      borderColor: 'green',
      padding: '7rem'
    })
  })

  it('should forward all props', async () => {
    class Foo extends Component {
      render () {
        return <div>hello world</div>
      }
    }

    const composeTheme = () => ({
      background: 'black',
      margin: '10rem'
    })

    const props = {
      bar: 'bar',
      baz: true,
      qux: () => 'hello world'
    }

    const ThemeableFoo = themeable(Foo, composeTheme)

    let component = null
    await mount(<ThemeableFoo componentRef={(el) => { component = el }} {...props} />)

    expect(component.props).to.deep.equal({
      ...props,
      theme: composeTheme()
    })
  })
})
/* eslint-enable react/no-multi-comp */
