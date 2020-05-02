import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { passthroughProps } from '@instructure/ui-react-utils'

import Focusable from '../util/Focusable'
import FocusRing from '../FocusRing'

import themeable from '../theming/themeable'
import composeTheme from './theme'

import TileHighlight from './TileHighlight'
import DefaultFacade from './DefaultFacade'
import EditFacade from './EditFacade'
import RemoveFacade from './RemoveFacade'

import { TileStyles } from './styles'

class Tile extends Component {
  _element = null

  static propTypes = {
    value: PropTypes.number,
    label: PropTypes.node,
    facade: PropTypes.oneOf(['default', 'presentation', 'edit', 'remove']),
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    elementRef: PropTypes.func,
    editing: PropTypes.bool,
    highlighted: PropTypes.bool,
    focused: PropTypes.bool,
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
    elementRef: () => {},
    editing: false,
    highlighted: false,
    focused: false
  }

  shouldComponentUpdate (nextProps) {
    const {
      value,
      label,
      facade,
      highlighted,
      focused,
      tabIndex,
      editing
    } = this.props

    return value !== nextProps.value
      || label !== nextProps.label
      || facade !== nextProps.facade
      || highlighted !== nextProps.highlighted
      || focused !== nextProps.focused
      || tabIndex !== nextProps.tabIndex
      || editing !== nextProps.editing
  }

  componentDidUpdate () {
    const { focused } = this.props

    if (focused && document.activeElement !== this._element) {
      this._element.focus()
    }
  }

  get facade () {
    const { facade } = this.props

    if (facade === 'remove') return RemoveFacade
    if (facade === 'edit') return EditFacade

    return DefaultFacade
  }

  handleClick = (event) => {
    const { onClick, value, coords } = this.props
    onClick(event, { coords, value })
  }

  handleKeyDown = (event) => {
    const { onKeyDown, value, coords } = this.props
    onKeyDown(event, { coords, value })
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
      coords,
      onClick,
      onKeyDown,
      ...props
    } = this.props

    const Facade = this.facade

    const tileProps = {
      tabIndex,
      facade,
      ref: this.handleElementRef,
      onKeyDown: this.handleKeyDown,
      onClick: this.handleClick,
      as: facade === 'presentation' ? 'span' : 'button',
      ...passthroughProps(props)
    }

    const children = ['default', 'presentation'].includes(facade) ? (
      <React.Fragment>
        {label}
        {highlighted && <TileHighlight />}
      </React.Fragment>
    ) : null

    const renderTile = ({ getFocusableProps, focused }) => (
      <TileStyles {...getFocusableProps(tileProps)}>
        <Facade
          label={label}
          value={value}
          editing={editing}
          focused={focused}
        >
          {children}
        </Facade>
        <FocusRing focused={focused} />
      </TileStyles>
    )

    return <Focusable render={renderTile} />
  }
}

export default themeable(Tile, composeTheme)
