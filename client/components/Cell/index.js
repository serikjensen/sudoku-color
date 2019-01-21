import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withTheme } from 'styled-components'

import Popover, { PopoverTrigger, PopoverContent } from '@instructure/ui-overlays/lib/components/Popover'
import ApplyTheme from '@instructure/ui-themeable/lib/components/ApplyTheme'
import View from '@instructure/ui-layout/lib/components/View'
import { setTile } from '../../actions/puzzleActions'

import CellMenu from '../CellMenu'
import Tile from '../Tile'

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
    active: PropTypes.bool,
    tabIndex: PropTypes.number,
    onMenuDismiss: PropTypes.func,
    highlighted: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    theme: PropTypes.object
  }

  static defaultProps = {
    value: null,
    setTile: () => {},
    onKeyDown: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onClick: () => {},
    active: false,
    tabIndex: -1,
    onMenuDismiss: () => {},
    highlighted: false,
    theme: null
  }

  state = {
    show: false
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

  handleClick = (e, coords, value) => {
    const { onClick } = this.props
    onClick(e, coords, value)
    this.showMenu()
  }

  handlePopoverDismiss = () => {
    this.hideMenu()
    this.props.onMenuDismiss()
  }

  handleSelect = (event, value) => {
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
    onMouseEnter(event, coords, value)
  }

  handleMouseLeave = (event) => {
    const { onMouseLeave, value, coords } = this.props
    onMouseLeave(event, coords, value)
  }

  render () {
    const {
      value,
      tabIndex,
      active,
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
          labelVisible={value !== 0}
          onKeyDown={onKeyDown}
          onClick={this.handleClick}
          active={active}
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

    /* eslint-disable react/no-array-index-key */
    return value < 0 ? children : (
      <ApplyTheme theme={{
          [View.theme]: {
            borderRadiusMedium: '1rem',
            shadowResting: '0 0.1875rem 0.375rem rgba(0, 0, 0, 0.1), 0 0.1875rem 0.375rem rgba(0, 0, 0, 0.16)'
          }
        }}
      >
        <Popover
          on="click"
          show={this.state.show}
          onDismiss={this.handlePopoverDismiss}
          shouldContainFocus={false}
          offsetY={-12}
        >
          <PopoverTrigger>
            {children}
          </PopoverTrigger>
          <PopoverContent>
            <CellMenu
              value={value}
              onSelect={this.handleSelect}
              theme={this.props.theme}
            />
          </PopoverContent>
        </Popover>
      </ApplyTheme>
    )
    /* eslint-enable react/no-array-index-key */
  }
}

export default connect(null, { setTile })(withTheme(Cell))
