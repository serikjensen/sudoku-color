import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import DataGrid from '../util/DataGrid'
import Cell from '../Cell'

class Board extends Component {
  static propTypes = {
    puzzle: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
  }

  _dataGrid = null

  reset () {
    this._dataGrid.reset()
  }

  handleDataGridRef = (el) => {
    this._dataGrid = el
  }

  renderGrid () {
    const { puzzle } = this.props

    /* eslint-disable react/no-array-index-key */
    const tableBody = ({ getTableProps, getCellProps }) => (
      <table {...getTableProps()}>
        <tbody>
          {puzzle.map((row, i) => (
            <tr key={`${i}`}>
              {row.map((value, j) => (
                <td key={`${j}`}>
                  <Cell
                    coords={{ i, j }}
                    value={value}
                    puzzle={puzzle}
                    {...getCellProps({ coords: { i, j } })}
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
