import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Tile extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onClick: PropTypes.func
  }

  static defaultProps = {
    onClick: () => {}
  }

  handleClick = (event) => {
    const { onClick, value } = this.props
    onClick(event, value)
  }

  render () {
    const { value } = this.props

    let tile
    if (value < 0) {
      tile = <span>preset value: {value * -1}</span>
    } else if (value === 0) {
      tile = <button onClick={this.handleClick}>add tile</button>
    } else {
      tile = <button onClick={this.handleClick}>{value}</button>
    }
    return tile
  }
}

export default Tile
