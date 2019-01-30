import React, { Component } from 'react'

import composeTheme from './theme'
import themeable from '../theming/themeable'
import {
  HeaderStyles,
  SwatchContainerStyles,
  SwatchStyles
} from './styles'

class AppLogo extends Component {
  render () {
    return (
      <React.Fragment>
        <HeaderStyles {...this.props}>Sudoku Color</HeaderStyles>
        <SwatchContainerStyles>
          <SwatchStyles value={1} />
          <SwatchStyles value={2} />
          <SwatchStyles value={3} />
          <SwatchStyles value={4} />
          <SwatchStyles value={5} />
          <SwatchStyles value={6} />
          <SwatchStyles value={7} />
          <SwatchStyles value={8} />
          <SwatchStyles value={9} />
        </SwatchContainerStyles>
      </React.Fragment>
    )
  }
}

export default themeable(AppLogo, composeTheme)
