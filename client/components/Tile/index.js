import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { omitProps } from '@instructure/ui-react-utils'

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
    highlighted: false
  }

  shouldComponentUpdate (nextProps) {
    const {
      value,
      label,
      facade,
      highlighted,
      tabIndex,
      editing
    } = this.props

    return value !== nextProps.value ||
      label !== nextProps.label ||
      facade !== nextProps.facade ||
      highlighted !== nextProps.highlighted ||
      tabIndex !== nextProps.tabIndex ||
      editing !== nextProps.editing
  }

  get facade () {
    const { facade } = this.props

    if (facade === 'remove') return RemoveFacade
    if (facade === 'edit') return EditFacade

    return DefaultFacade
  }

  _element = null

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
      ...omitProps(props, Tile.propTypes)
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
