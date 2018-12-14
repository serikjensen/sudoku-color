import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import getAvailableValues from '../../util/getAvailableValues'
import DataGrid from '../util/DataGrid'
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

  get availableValues () {
    const { value, puzzle } = this.props
    const availableValues = (getAvailableValues([value], puzzle) || [])

    if (value) {
      availableValues.push(0) // Add null value which generates the tile remove button
    }

    if (availableValues.length === 1) {
      return [[availableValues[0]]]
    }

    // Given a single array of available values, format such that it fits on a max 3x3 grid
    return availableValues.reduce((collection, availableValue, i) => {
      const index = Math.floor(i / 3)

      if (Array.isArray(collection)) {
        collection[index] ? collection[index].push(availableValue) : collection.push([availableValue])
      }

      return Array.isArray(collection) ? collection : [[collection, availableValue]]
    })
  }

  handleTileClick = (event, coords, value) => {
    const { onSelect } = this.props
    onSelect(event, value)
  }

  render () {
    /* eslint-disable react/no-array-index-key */
    const tableBody = ({ getTableProps, getCellProps }) => (
      <table {...getTableProps()}>
        <tbody>
          {this.availableValues.map((row, i) => (
            <tr key={`${i}`}>
              {row.map((availableValue, j) => (
                <td key={`${j}`}>
                  <Tile
                    coords={{ i, j }}
                    value={availableValue}
                    label={availableValue === 0 && 'Delete value'}
                    {...getCellProps({
                      onClick: this.handleTileClick,
                      coords: { i, j }
                    })}
                  />
                </td>))
              }
            </tr>
          ))}
        </tbody>
      </table>
    )
    /* eslint-enable react/no-array-index-key */

    return (
      <DataGrid
        label="Select value"
        render={tableBody}
      />
    )
  }
}

const mapStateToProps = state => state.puzzle

export default connect(mapStateToProps)(CellMenu)
