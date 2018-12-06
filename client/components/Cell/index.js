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
    selected: PropTypes.bool
  }

  static defaultProps = {
    value: null,
    setTile: () => {},
    onKeyDown: () => {},
    onClick: () => {},
    selected: false
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

  handleClick = (e) => {
    const { coords, onClick } = this.props
    onClick(e, coords)
    this.showMenu()
  }

  handleKeyDown = (e) => {
    const { coords, onKeyDown } = this.props
    onKeyDown(e, coords)
  }

  handlePopoverDismiss = () => {
    this.hideMenu()
  }

  handleSelect = (event, value) => {
    const { coords } = this.props
    this.props.setTile(coords, value)
    this.hideMenu()
  }

  render () {
    const { value, selected } = this.props

    /* eslint-disable react/no-array-index-key */
    return (
      <Popover
        show={this.state.show}
        onDismiss={this.handlePopoverDismiss}
        shouldContainFocus={false}
      >
        <PopoverTrigger>
          <Tile
            value={value}
            selected={selected}
            onKeyDown={this.handleKeyDown}
            onClick={this.handleClick}
          />
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
