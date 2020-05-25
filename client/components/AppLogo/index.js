import React, { Component } from 'react'

import { PresentationContent } from '@instructure/ui-a11y-content'

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
        <PresentationContent>
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
        </PresentationContent>
      </React.Fragment>
    )
  }
}

export default themeable(AppLogo, composeTheme)
