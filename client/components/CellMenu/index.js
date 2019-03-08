import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import getAvailableValues from '../../util/getAvailableValues'
import DataGrid from '../util/DataGrid'
import Tile from '../Tile'

import themeable from '../theming/themeable'
import composeTheme from './theme'
import {
  TableStyles,
  CellStyles
} from './styles'

class CellMenu extends PureComponent {
  static propTypes = {
    value: PropTypes.number.isRequired,
    puzzle: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    onSelect: PropTypes.func
  }

  static defaultProps = {
    onSelect: () => {}
  }

  state = {
    focusedCoords: { i: 0, j: 0 }
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

  handleDataGridMove = (event, { direction }) => {
    const { availableValues } = this

    this.setState(({ focusedCoords }) => {
      const i = focusedCoords.i + direction.i
      const j = focusedCoords.j + direction.j

      return {
        focusedCoords: (
          i >= 0 && availableValues[i] !== 'undefined' && j >= 0 && typeof availableValues[i][j] !== 'undefined'
        ) ? { i, j } : focusedCoords
      }
    })
  }

  handleTileClick = (event, { value }) => {
    const { onSelect } = this.props
    onSelect(event, { value })
  }

  generateLabel = (value) => {
    if (value < 0) return value * -1
    if (value === 0) return 'Remove tile'

    return value
  }

  render () {
    const { focusedCoords } = this.state

    /* eslint-disable react/no-array-index-key */
    const tableBody = ({ getRootProps, getCellProps }) => (
      <TableStyles
        {...getRootProps({
          ref: this.handleTableRef,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur
        })}
      >
        <tbody>
          {this.availableValues.map((row, i) => (
            <tr key={`${i}`}>
              {row.map((availableValue, j) => (
                <td key={`${j}`}>
                  <CellStyles>
                    <Tile
                      {...getCellProps({
                        onClick: this.handleTileClick,
                        coords: { i, j },
                        value: availableValue,
                        facade: availableValue > 0 ? 'default' : 'remove',
                        label: this.generateLabel(availableValue)
                      })}
                    />
                  </CellStyles>
                </td>))
              }
            </tr>
          ))}
        </tbody>
      </TableStyles>
    )
    /* eslint-enable react/no-array-index-key */

    return (
      <DataGrid
        label="Select value"
        render={tableBody}
        focusedCoords={focusedCoords}
        onRequestMove={this.handleDataGridMove}
      />
    )
  }
}

const mapStateToProps = state => state.puzzle

export default connect(mapStateToProps)(themeable(CellMenu, composeTheme))
