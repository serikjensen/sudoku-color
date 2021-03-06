import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  ScreenReaderContent,
  PresentationContent
} from '@instructure/ui-a11y-content'

import { IconTrashSolid } from '@instructure/ui-icons'

import themeable from '../../theming/themeable'
import composeTheme from './theme'
import { RemoveFacadeStyles } from './styles'

export const testSelector = 'data-sudoku-color-tile-remove'

class RemoveFacade extends PureComponent {
  static propTypes = {
    label: PropTypes.node
  }

  static defaultProps = {
    label: null
  }

  render () {
    const { label } = this.props

    const props = {
      [testSelector]: true
    }

    return (
      <RemoveFacadeStyles {...props}>
        <ScreenReaderContent>{label}</ScreenReaderContent>
        <PresentationContent>
          <IconTrashSolid size="x-small" />
        </PresentationContent>
      </RemoveFacadeStyles>
    )
  }
}

export default themeable(RemoveFacade, composeTheme)
