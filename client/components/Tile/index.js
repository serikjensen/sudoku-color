import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setTile } from '../../actions/puzzleActions'

class Tile extends Component {
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

  render () {
    const { value, coords } = this.props
    const handleSetTile = () => { this.props.setTile(coords, 5) }

    let tile
    if (value < 0) {
      tile = <span>preset value: {value * -1}</span>
    } else if (value === 0) {
      tile = <button onClick={handleSetTile}>add tile</button>
    } else {
      tile = <button onClick={handleSetTile}>{value} (edit)</button>
    }
    return tile
  }
}

export default connect(
  null,
  { setTile }
)(Tile)
