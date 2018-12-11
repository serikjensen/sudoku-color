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

  handleTileClick = (event, coords, value) => {
    const { onSelect } = this.props
    onSelect(event, value)
  }

  render () {
    const { value, puzzle } = this.props
    const availableValues = getAvailableValues([value], puzzle)

    /* eslint-disable react/no-array-index-key */
    const tableBody = ({ getTableProps, getCellProps }) => (
      <table {...getTableProps()}>
        <tbody>
          {
            // Given a single array of available values, format such that it fits on a max 3x3 grid
            availableValues.reduce((collection, availableValue, i) => {
              const index = Math.floor(i / 3)

              if (Array.isArray(collection)) {
                collection[index] ? collection[index].push(availableValue) : collection.push([availableValue])
              }

              return Array.isArray(collection) ? collection : [[collection, availableValue]]
            }).map((row, i) => (
              <tr key={`${i}`}>
                {row.map((availableValue, j) => (
                  <td key={`${j}`}>
                    <Tile
                      debug
                      coords={{ i, j }}
                      value={availableValue}
                      {...getCellProps({
                        onClick: this.handleTileClick,
                        coords: { i, j }
                      })}
                    />
                  </td>))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    )
    /* eslint-enable react/no-array-index-key */

    return (
      <DataGrid
        label="Available Tiles"
        render={tableBody}
      />
    )
  }
}

const mapStateToProps = state => state.puzzle

export default connect(mapStateToProps)(CellMenu)
