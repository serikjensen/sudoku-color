import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import containsActiveElement from '@instructure/ui-utils/lib/dom/containsActiveElement'
import requestAnimationFrame from '@instructure/ui-utils/lib/dom/requestAnimationFrame'

import DataGrid from '../util/DataGrid'
import Cell from '../Cell'

import { TableStyles, TdStyles } from './styles'

class Board extends PureComponent {
  static propTypes = {
    puzzle: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
  }

  state = {
    active: false,
    hoveredCoords: null
  }

  componentWillUnmount () {
    this._raf.forEach(request => {
      request.cancel()
    })
    this._raf = []
  }

  _dataGrid = null
  _table = null
  _raf = []

  reset () {
    this._dataGrid.reset()
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

  handleDataGridRef = (el) => {
    this._dataGrid = el
  }

  handleTableRef = (el) => {
    this._table = el
  }

  handleCellMenuDismiss = () => {
    this.setState({ active: true })
  }

  handleCellMouseEnter = (event, { i, j }) => {
    this.setState({ hoveredCoords: { i, j } })
  }

  handleCellMouseLeave = () => {
    this.setState({ hoveredCoords: null })
  }

  cellHighlighted = (coords, selectedCoords) => {
    const { puzzle } = this.props
    const { hoveredCoords, active } = this.state

    const value = puzzle[coords.i][coords.j]

    if (value === 0) return false

    const compareValues = ({ i, j }) => Math.abs(value) === Math.abs(puzzle[i][j])

    // Give preference to mouse hover
    return hoveredCoords ? compareValues(hoveredCoords) : active && compareValues(selectedCoords)
  }

  renderGrid () {
    const { puzzle } = this.props

    /* eslint-disable react/no-array-index-key */
    /* eslint-disable jsx-a11y/mouse-events-have-key-events */
    const tableBody = ({ getTableProps, getCellProps, selectedCoords }) => (
      <TableStyles
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        {...getTableProps({
          ref: this.handleTableRef
        })}
        onMouseOut={this.handleBoardMouseOut}
      >
        <tbody>
          {puzzle.map((row, i) => (
            <tr key={`${i}`}>
              {row.map((value, j) => (
                <TdStyles key={`${j}`}>
                  <Cell
                    coords={{ i, j }}
                    value={value}
                    puzzle={puzzle}
                    active={this.state.active}
                    onMenuDismiss={this.handleCellMenuDismiss}
                    onMouseEnter={this.handleCellMouseEnter}
                    onMouseLeave={this.handleCellMouseLeave}
                    highlighted={this.cellHighlighted({ i, j }, selectedCoords)}
                    {...getCellProps({ coords: { i, j } })}
                  />
                </TdStyles>))
              }
            </tr>
          ))}
        </tbody>
      </TableStyles>
    )
    /* eslint-enable react/no-array-index-key */
    /* eslint-enable jsx-a11y/mouse-events-have-key-events */

    return (
      <DataGrid
        label="Sudoku Board"
        render={tableBody}
        ref={this.handleDataGridRef}
      />
    )
  }

  render () {
    return <div>{ this.renderGrid() }</div>
  }
}

const mapStateToProps = state => state.puzzle

export default connect(mapStateToProps, null, null, { withRef: true })(Board)
