import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { ThemeProvider } from 'styled-components'

import containsActiveElement from '@instructure/ui-utils/lib/dom/containsActiveElement'
import requestAnimationFrame from '@instructure/ui-utils/lib/dom/requestAnimationFrame'

import getAvailableValues from '../../util/getAvailableValues'
import DataGrid from '../util/DataGrid'
import Tile from '../Tile'

import {
  TableStyles,
  CellStyles
} from './styles'

class CellMenu extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    puzzle: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    onSelect: PropTypes.func
  }

  static defaultProps = {
    onSelect: () => {}
  }

  state = {
    active: false
  }

  componentWillUnmount () {
    this._raf.forEach(request => {
      request.cancel()
    })
    this._raf = []
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

  _raf = []

  handleTileClick = (event, coords, value) => {
    const { onSelect } = this.props
    onSelect(event, value)
  }

  handleFocus = () => {
    this.setState({ active: true })
  }

  handleBlur = () => {
    this._raf.push(requestAnimationFrame(() => {
      if (!containsActiveElement(this._table)) {
        this.setState({ active: false })
      }
    }))
  }

  handleTableRef = (el) => {
    this._table = el
  }

  generateLabel = (value) => {
    if (value < 0) return value * -1
    if (value === 0) return 'Remove tile'

    return value
  }

  render () {
    /* eslint-disable react/no-array-index-key */
    const tableBody = ({ getTableProps, getCellProps }) => (
      <TableStyles
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        {...getTableProps({
          ref: this.handleTableRef
        })}
      >
        <tbody>
          {this.availableValues.map((row, i) => (
            <tr key={`${i}`}>
              {row.map((availableValue, j) => (
                <td key={`${j}`}>
                  <CellStyles>
                    <Tile
                      coords={{ i, j }}
                      value={availableValue}
                      facade={availableValue > 0 ? 'default' : 'remove'}
                      label={this.generateLabel(availableValue)}
                      labelVisible={availableValue !== 0}
                      active={this.state.active}
                      {...getCellProps({
                        onClick: this.handleTileClick,
                        coords: { i, j }
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
      <ThemeProvider theme={this.props.theme}>
        <DataGrid
          label="Select value"
          render={tableBody}
        />
      </ThemeProvider>
    )
  }
}

const mapStateToProps = state => state.puzzle

export default connect(mapStateToProps)(CellMenu)
