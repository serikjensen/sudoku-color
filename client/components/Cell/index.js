import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Popover, { PopoverTrigger, PopoverContent } from '@instructure/ui-overlays/lib/components/Popover'
import { setTile } from '../../actions/puzzleActions'

import CellMenu from '../CellMenu'
import Tile from '../Tile'

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
    active: PropTypes.bool,
    tabIndex: PropTypes.number,
    onMenuDismiss: PropTypes.func
  }

  static defaultProps = {
    value: null,
    setTile: () => {},
    onKeyDown: () => {},
    onClick: () => {},
    active: false,
    tabIndex: -1,
    onMenuDismiss: () => {}
  }

  state = {
    show: false
  }

  hideMenu = () => {
    this.setState({ show: false })
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

  render () {
    const {
      value,
      tabIndex,
      active,
      coords,
      onKeyDown
    } = this.props

    const tile = (
      <Tile
        value={value}
        label={value === 0 && 'Choose tile'}
        onKeyDown={onKeyDown}
        onClick={this.handleClick}
        active={active}
        tabIndex={tabIndex}
        coords={coords}
        aria-haspopup={value >= 0 ? 'true' : null}
      />
    )

    /* eslint-disable react/no-array-index-key */
    return value < 0 ? tile : (
      <Popover
        on="click"
        show={this.state.show}
        onDismiss={this.handlePopoverDismiss}
        shouldContainFocus={false}
      >
        <PopoverTrigger>
          {tile}
        </PopoverTrigger>
        <PopoverContent>
          <CellMenu
            value={value}
            onSelect={this.handleSelect}
          />
        </PopoverContent>
      </Popover>
    )
    /* eslint-enable react/no-array-index-key */
  }
}

export default connect(null, { setTile })(Cell)
