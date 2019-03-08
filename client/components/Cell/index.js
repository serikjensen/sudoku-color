import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Popover from '../util/Popover'
import { setTile } from '../../actions/puzzleActions'

import CellMenu from '../CellMenu'
import Tile from '../Tile'

import themeable from '../theming/themeable'
import composeTheme from './theme'
import { CellStyles } from './styles'

class Cell extends Component {
  static propTypes = {
    value: PropTypes.number,
    coords: PropTypes.shape({
      i: PropTypes.number.isRequired,
      j: PropTypes.number.isRequired
    }).isRequired,
    setTile: PropTypes.func,
    onKeyDown: PropTypes.func,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    tabIndex: PropTypes.number,
    onMenuDismiss: PropTypes.func,
    highlighted: PropTypes.bool
  }

  static defaultProps = {
    value: null,
    setTile: () => {},
    onKeyDown: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onClick: () => {},
    tabIndex: -1,
    onMenuDismiss: () => {},
    highlighted: false
  }

  state = {
    show: false
  }

  shouldComponentUpdate (nextProps, nextState) {
    const { value, highlighted, tabIndex } = this.props
    const { show } = this.state

    return value !== nextProps.value ||
      highlighted !== nextProps.highlighted ||
      tabIndex !== nextProps.tabIndex ||
      show !== nextState.show
  }

  get facade () {
    const { value } = this.props

    if (value < 0) return 'presentation'
    if (value === 0) return 'edit'

    return 'default'
  }

  get label () {
    const { value } = this.props

    if (value < 0) return value * -1
    if (value === 0) return 'Choose tile'

    return value
  }

  _tile = null

  hideMenu = () => {
    this.setState({ show: false }, () => {
      this._tile.focus()
    })
  }

  showMenu = () => {
    this.setState({ show: true })
  }

  handleClick = (event, { coords, value }) => {
    const { onClick } = this.props
    onClick(event, { coords, value })
    this.showMenu()
  }

  handlePopoverDismiss = () => {
    this.hideMenu()
    this.props.onMenuDismiss()
  }

  handleSelect = (event, { value }) => {
    const { coords } = this.props
    this.props.setTile(coords, value)
    this.hideMenu()
    this.props.onMenuDismiss()
  }

  handleTileRef = (el) => {
    this._tile = el
  }

  handleMouseEnter = (event) => {
    const { onMouseEnter, value, coords } = this.props
    onMouseEnter(event, { coords, value })
  }

  handleMouseLeave = (event) => {
    const { onMouseLeave, value, coords } = this.props
    onMouseLeave(event, { coords, value })
  }

  render () {
    const {
      value,
      tabIndex,
      coords,
      onKeyDown,
      highlighted
    } = this.props

    /* eslint-disable jsx-a11y/mouse-events-have-key-events */
    const children = (
      <CellStyles
        coords={coords}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Tile
          value={value}
          facade={this.facade}
          label={this.label}
          onKeyDown={onKeyDown}
          onClick={this.handleClick}
          tabIndex={tabIndex}
          coords={coords}
          aria-haspopup={value >= 0 ? 'true' : null}
          elementRef={this.handleTileRef}
          editing={this.state.show}
          highlighted={highlighted}
        />
      </CellStyles>
    )
    /* eslint-enable jsx-a11y/mouse-events-have-key-events */

    const menuContent = (
      <CellMenu
        value={value}
        onSelect={this.handleSelect}
      />
    )

    /* eslint-disable react/no-array-index-key */
    return value < 0 ? children : (
      <Popover
        on="click"
        show={this.state.show}
        onDismiss={this.handlePopoverDismiss}
        shouldContainFocus={false}
        offsetY={-12}
        trigger={children}
        content={menuContent}
      />
    )
    /* eslint-enable react/no-array-index-key */
  }
}

export default connect(null, { setTile })(themeable(Cell, composeTheme))
