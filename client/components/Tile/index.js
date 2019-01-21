import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
import PresentationContent from '@instructure/ui-a11y/lib/components/PresentationContent'

import IconEdit from '@instructure/ui-icons/lib/Line/IconEdit'
import IconTrash from '@instructure/ui-icons/lib/Solid/IconTrash'

import {
  DefaultFacadeStyles,
  PresentationFacadeStyles,
  EditFacadeStyles,
  RemoveFacadeStyles,
  EditLabelStyles,
  HighlightStyles
} from './styles'

class Tile extends Component {
  static propTypes = {
    value: PropTypes.number,
    label: PropTypes.node,
    labelVisible: PropTypes.bool,
    facade: PropTypes.oneOf(['default', 'presentation', 'edit', 'remove']),
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    tabIndex: PropTypes.number,
    active: PropTypes.bool,
    elementRef: PropTypes.func,
    editing: PropTypes.bool,
    highlighted: PropTypes.bool,
    coords: PropTypes.shape({
      i: PropTypes.number.isRequired,
      j: PropTypes.number.isRequired
    }).isRequired
  }

  static defaultProps = {
    value: null,
    label: null,
    labelVisible: true,
    facade: 'default',
    onClick: () => {},
    onKeyDown: () => {},
    tabIndex: -1,
    active: false,
    elementRef: () => {},
    editing: false,
    highlighted: false
  }

  componentWillUpdate (nextProps) {
    const { tabIndex, active } = this.props

    if (tabIndex === -1 && nextProps.tabIndex === 0 && active) {
      this._element.focus()
    }
  }

  get facade () {
    const { facade } = this.props

    if (facade === 'presentation') return PresentationFacadeStyles
    if (facade === 'remove') return RemoveFacadeStyles
    if (facade === 'edit') return EditFacadeStyles

    return DefaultFacadeStyles
  }

  _element = null

  handleClick = (event) => {
    const { onClick, value, coords } = this.props
    onClick(event, coords, value)
  }

  handleKeyDown = (event) => {
    const { onKeyDown, value, coords } = this.props
    onKeyDown(event, coords, value)
  }

  handleElementRef = (el) => {
    this.props.elementRef(el)
    this._element = el
  }

  render () {
    const {
      value,
      label,
      labelVisible,
      tabIndex,
      facade,
      editing,
      highlighted,
      ...props
    } = this.props

    const Facade = this.facade

    return (
      <Facade
        tabIndex={tabIndex}
        onKeyDown={this.handleKeyDown}
        onClick={this.handleClick}
        ref={this.handleElementRef}
        label={label}
        as={facade === 'presentation' ? 'span' : 'button'}
        {...omitProps(props, Tile.propTypes)}
      >
        <ScreenReaderContent>{label}</ScreenReaderContent>
        {labelVisible && <PresentationContent>{label}</PresentationContent>}
        {facade === 'edit' && (
          <EditLabelStyles editing={editing}>
            <IconEdit size="small" />
          </EditLabelStyles>
        )}
        {facade === 'remove' && <IconTrash size="x-small" />}
        {highlighted && <HighlightStyles />}
      </Facade>
    )
  }
}

export default Tile
