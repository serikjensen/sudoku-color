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
  _tile = null

  static propTypes = {
    value: PropTypes.number,
    coords: PropTypes.shape({
      i: PropTypes.number.isRequired,
      j: PropTypes.number.isRequired
    }).isRequired,
    setTile: PropTypes.func,
    onKeyDown: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onMenuShow: PropTypes.func,
    onMenuDismiss: PropTypes.func,
    highlighted: PropTypes.bool,
    focused: PropTypes.bool
  }

  static defaultProps = {
    value: null,
    setTile: () => {},
    onKeyDown: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onClick: () => {},
    onFocus: () => {},
    onBlur: () => {},
    tabIndex: -1,
    onMenuShow: () => {},
    onMenuDismiss: () => {},
    highlighted: false,
    focused: false
  }

  state = {
    show: false
  }

  shouldComponentUpdate (nextProps, nextState) {
    const { value, highlighted, focused, tabIndex } = this.props
    const { show } = this.state

    return value !== nextProps.value
      || highlighted !== nextProps.highlighted
      || focused !== nextProps.focused
      || tabIndex !== nextProps.tabIndex
      || show !== nextState.show
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

  hideMenu = () => {
    this._tile && this._tile.focus()
    this.setState({ show: false })
  }

  showMenu = () => {
    this.setState({ show: true })
  }

  handleClick = (event, { coords, value }) => {
    const { onClick } = this.props
    onClick(event, { coords, value })

    if (this.facade !== 'presentation') {
      this.showMenu()
    }
  }

  handleKeyDown = (event, { coords, value }) => {
    const { onKeyDown } = this.props
    onKeyDown(event, { coords, value })

    if (this.facade !== 'presentation' && !this.state.show) {
      const { key, keyCode } = event

      // Values 1-9 are valid
      if (keyCode >= 49 && keyCode <= 57) {
        this.props.setTile(coords, Number(key))
      }

      // Remove the tile if delete
      if (keyCode === 8) {
        this.props.setTile(coords, 0)
      }
    }
  }

  handlePopoverDismiss = (event) => {
    this.hideMenu()
    this.props.onMenuDismiss(event)
  }

  handlePopoverShow = () => {
    const { coords, value } = this.props
    this.props.onMenuShow(null, { coords, value })
  }

  handleSelect = (event, { value }) => {
    const { coords } = this.props
    this.props.setTile(coords, value)
    this.handlePopoverDismiss(event)
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
      onFocus,
      onBlur,
      highlighted,
      focused
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
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          tabIndex={tabIndex}
          coords={coords}
          aria-haspopup={value >= 0 ? 'true' : null}
          elementRef={this.handleTileRef}
          editing={this.state.show}
          highlighted={highlighted}
          focused={focused}
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
        isShowingContent={this.state.show}
        onPositioned={this.handlePopoverShow}
        onHideContent={this.handlePopoverDismiss}
        shouldContainFocus={false}
        offsetY={-12}
        trigger={children}
        content={menuContent}
      />
    )
    /* eslint-enable react/no-array-index-key */
  }
}

const ThemeableCell = themeable(Cell, composeTheme)

export { ThemeableCell as Cell }
export default connect(null, { setTile })(ThemeableCell)
