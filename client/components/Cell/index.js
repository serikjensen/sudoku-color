import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Popover, { PopoverTrigger, PopoverContent } from '@instructure/ui-overlays/lib/components/Popover'
import { setTile } from '../../actions/puzzleActions'

import CellMenu from '../CellMenu'
import Tile from '../Tile'

class Cell extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    coords: PropTypes.shape({
      i: PropTypes.number.isRequired,
      j: PropTypes.number.isRequired
    }).isRequired,
    setTile: PropTypes.func
  }

  static defaultProps = {
    setTile: () => {}
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

  handleCellClick = () => {
    this.showMenu()
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
    const { value } = this.props

    /* eslint-disable react/no-array-index-key */
    return (
      <Popover
        show={this.state.show}
        onDismiss={this.handlePopoverDismiss}
        shouldContainFocus
      >
        <PopoverTrigger>
          <Tile
            value={value}
            onClick={this.handleCellClick}
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
