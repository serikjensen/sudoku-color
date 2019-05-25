import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import DataGrid from '../util/DataGrid'
import Cell from '../Cell'

import composeTheme from './theme'
import themeable from '../theming/themeable'
import { TableStyles, TdStyles } from './styles'

class Board extends PureComponent {
  static propTypes = {
    puzzle: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
  }

  state = {
    hoveredCoords: null,
    focusedCoords: { i: 0, j: 0 }
  }

  reset () {
    this.setState({ focusedCoords: { i: 0, j: 0 } })
  }

  handleDataGridMove = (event, { direction }) => {
    const { puzzle } = this.props

    this.setState(({ focusedCoords }) => {
      const i = focusedCoords.i + direction.i
      const j = focusedCoords.j + direction.j

      return {
        focusedCoords: (
          i >= 0 && typeof puzzle[i] !== 'undefined' && j >= 0 && typeof puzzle[i][j] !== 'undefined'
        ) ? { i, j } : focusedCoords
      }
    })
  }

  handleCellClick = (event, { coords }) => {
    this.setState({ focusedCoords: coords })
  }

  handleCellMouseEnter = (event, { coords }) => {
    this.setState({ hoveredCoords: coords })
  }

  handleCellMouseLeave = () => {
    this.setState({ hoveredCoords: null })
  }

  cellHighlighted = (coords, focused) => {
    const { puzzle } = this.props
    const { hoveredCoords, focusedCoords } = this.state

    const value = puzzle[coords.i][coords.j]

    if (value === 0) return false

    const compareValues = ({ i, j }) => Math.abs(value) === Math.abs(puzzle[i][j])

    // Give preference to mouse hover
    return hoveredCoords ? compareValues(hoveredCoords) : focused && compareValues(focusedCoords)
  }

  renderGrid () {
    const { puzzle } = this.props
    const { focusedCoords } = this.state

    /* eslint-disable react/no-array-index-key */
    /* eslint-disable jsx-a11y/mouse-events-have-key-events */
    const tableBody = ({ getRootProps, getCellProps, focused }) => (
      <TableStyles
        {...getRootProps({
          onBlur: this.handleBlur,
          onFocus: this.handleFocus
        })}
      >
        <tbody>
          {puzzle.map((row, i) => (
            <tr key={`${i}`}>
              {row.map((value, j) => (
                <TdStyles key={`${j}`}>
                  <Cell
                    {...getCellProps({
                      coords: { i, j },
                      value,
                      puzzle,
                      onClick: this.handleCellClick,
                      onMenuDismiss: this.handleCellMenuDismiss,
                      onMouseEnter: this.handleCellMouseEnter,
                      onMouseLeave: this.handleCellMouseLeave,
                      highlighted: this.cellHighlighted({ i, j }, focused)
                    })}
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
        focusedCoords={focusedCoords}
        onRequestMove={this.handleDataGridMove}
      />
    )
  }

  render () {
    return <div>{ this.renderGrid() }</div>
  }
}

const ThemeableBoard = themeable(Board, composeTheme)

const mapStateToProps = state => state.puzzle

export { ThemeableBoard as Board }
export default connect(mapStateToProps, null, null, { withRef: true })(ThemeableBoard)
