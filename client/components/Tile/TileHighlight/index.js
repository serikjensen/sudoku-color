import React from 'react'

import themeable from '../../theming/themeable'
import composeTheme from './theme'
import { TileHighlightStyles } from './styles'

const TileHighlight = () => <TileHighlightStyles />

export default themeable(TileHighlight, composeTheme)
