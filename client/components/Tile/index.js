import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
import PresentationContent from '@instructure/ui-a11y/lib/components/PresentationContent'

import IconEdit from '@instructure/ui-icons/lib/Line/IconEdit'
import IconTrash from '@instructure/ui-icons/lib/Solid/IconTrash'

import FocusRing from '../FocusRing'

import themeable from '../theming/themeable'
import composeTheme from './theme'
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
      tabIndex,
      facade,
      editing,
      highlighted,
      ...props
    } = this.props

    const Facade = this.facade

    const facadeProps = {
      tabIndex,
      value,
      onKeyDown: this.handleKeyDown,
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      ref: this.handleElementRef,
      as: facade === 'presentation' ? 'span' : 'button',
      ...omitProps(props, Tile.propTypes)
    }

    let children = (
      <React.Fragment>
        {label}
        {highlighted && <HighlightStyles />}
      </React.Fragment>
    )

    if (facade === 'edit') {
      children = (
        <React.Fragment>
          <ScreenReaderContent>{label}</ScreenReaderContent>
          <PresentationContent>
            <EditLabelStyles editing={editing}>
              <IconEdit size="small" />
            </EditLabelStyles>
          </PresentationContent>
        </React.Fragment>
      )
    }

    if (facade === 'remove') {
      children = (
        <React.Fragment>
          <ScreenReaderContent>{label}</ScreenReaderContent>
          <PresentationContent>
            <IconTrash size="x-small" />
          </PresentationContent>
        </React.Fragment>
      )
    }

    return (
      <Facade {...facadeProps}>
        {children}
        <FocusRing />
      </Facade>
    )
  }
}

export default themeable(Tile, composeTheme)
