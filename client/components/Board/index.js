import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import keycode from 'keycode'

import VALUES from '../../constants/values'
import DataGrid from '../util/DataGrid'
import Cell from '../Cell'

class Board extends Component {
  static propTypes = {
    puzzle: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
  }

  state = {
    selectedCell: { i: 0, j: 0 }
  }

  handleCellKeyDown = (e, coords) => {
    const key = keycode(e.keyCode)
    if (['right', 'left', 'down', 'up'].includes(key)) {
      this.selectCell(key, coords)
    }
  }

  handleCellClick = (e, coords) => {
    this.setState({ selectedCell: { i: coords.i, j: coords.j } })
  }

  selectCell = (key, coords) => {
    const move = { i: 0, j: 0 }

    switch (key) { // eslint-disable-line default-case
      case 'right':
        move.j = 1
        break
      case 'left':
        move.j = -1
        break
      case 'up':
        move.i = -1
        break
      case 'down':
        move.i = 1
        break
    }

    this.setState(() => {
      const min = 0
      const max = VALUES.length - 1

      let i = coords.i + move.i
      let j = coords.j + move.j
      i = i < 0 ? min : i
      j = j < 0 ? min : j
      i = i > max ? max : i
      j = j > max ? max : j
      return { selectedCell: { i, j } }
    })
  }

  renderGrid () {
    const { puzzle } = this.props
    const { selectedCell } = this.state
    /* eslint-disable react/no-array-index-key */
    return (
      <DataGrid label="Sudoku Board">
        <tbody>
          {puzzle.map((row, i) => (
            <tr key={`${i}`}>
              {row.map((value, j) => (
                <td key={`${j}`}>
                  <Cell
                    coords={{ i, j }}
                    value={value}
                    puzzle={puzzle}
                    onKeyDown={this.handleCellKeyDown}
                    onClick={this.handleCellClick}
                    selected={selectedCell.i === i && selectedCell.j === j}
                  />
                </td>))
              }
            </tr>
          ))}
        </tbody>
      </DataGrid>
    )
    /* eslint-enable react/no-array-index-key */
  }

  render () {
    return <div>{ this.renderGrid() }</div>
  }
}

const mapStateToProps = state => state.puzzle

export default connect(mapStateToProps)(Board)
