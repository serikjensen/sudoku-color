import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import getAvailableValues from '../../util/getAvailableValues'
import Tile from '../Tile'

class CellMenu extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    puzzle: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    onSelect: PropTypes.func
  }

  static defaultProps = {
    onSelect: () => {}
  }

  handleTileClick = (event, value) => {
    const { onSelect } = this.props
    onSelect(event, value)
  }

  render () {
    const { value, puzzle } = this.props
    const availableValues = getAvailableValues([value], puzzle)

    /* eslint-disable react/no-array-index-key */
    return (
      <div>
        {availableValues.map((availableValue, i) => (
          <Tile
            key={i}
            value={availableValue}
            onClick={this.handleTileClick}
          />
        ))}
        {value > 0 && (
          <Tile
            value={0}
            onClick={this.handleTileClick}
          />
        )}
      </div>
    )
    /* eslint-enable react/no-array-index-key */
  }
}

const mapStateToProps = state => state.puzzle

export default connect(mapStateToProps)(CellMenu)
