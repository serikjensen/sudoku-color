import React from 'react'

import themeable from '../../theming/themeable'
import composeTheme from './theme'
import { TileHighlightStyles } from './styles'

export const testSelector = 'data-sudoku-color-tile-highlight'

const props = {
  [testSelector]: true
}

const TileHighlight = () => <TileHighlightStyles {...props} />

export default themeable(TileHighlight, composeTheme)
