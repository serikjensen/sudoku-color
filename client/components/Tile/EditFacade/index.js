import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
  ScreenReaderContent,
  PresentationContent
} from '@instructure/ui-a11y-content'

import { IconEditLine } from '@instructure/ui-icons'

import themeable from '../../theming/themeable'
import composeTheme from './theme'
import { EditFacadeStyles, EditLabelStyles } from './styles'

export const testSelector = 'data-sudoku-color-tile-edit'

class EditFacade extends PureComponent {
  static propTypes = {
    label: PropTypes.node,
    editing: PropTypes.bool,
    focused: PropTypes.bool
  }

  static defaultProps = {
    label: null,
    editing: false,
    focused: false
  }

  render () {
    const {
      label,
      editing,
      focused
    } = this.props

    const props = {
      [testSelector]: true
    }

    return (
      <EditFacadeStyles {...props}>
        <ScreenReaderContent>{label}</ScreenReaderContent>
        <PresentationContent>
          <EditLabelStyles
            editing={editing}
            focused={focused}
          >
            <IconEditLine />
          </EditLabelStyles>
        </PresentationContent>
      </EditFacadeStyles>
    )
  }
}

export default themeable(EditFacade, composeTheme)
