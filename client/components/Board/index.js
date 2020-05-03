import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import DataGrid from '../util/DataGrid'
import ConnectedCell from '../Cell'

import composeTheme from './theme'
import themeable from '../theming/themeable'
import { TableStyles, TdStyles } from './styles'

class Board extends PureComponent {
  static propTypes = {
    puzzle: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    defaultFocus: PropTypes.bool,
    cell: PropTypes.elementType
  }

  static defaultProps = {
    defaultFocus: false,
    cell: ConnectedCell
  }

  constructor (props) {
    super(props)

    this.state = {
      focused: props.defaultFocus,
      editing: false,
      hoveredCoords: null,
      editingCoords: null,
      focusedCoords: { i: 0, j: 0 }
    }
  }

  handleDataGridFocus = () => {
    this.setState({ focused: true })
  }

  handleDataGridBlur = () => {
    this.setState({ focused: false })
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

  handleCellMenuShow = (event, { coords }) => {
    this.setState({ editingCoords: coords, editing: true })
  }

  handleCellMenuDismiss = () => {
    this.setState({ editingCoords: null, editing: false })
  }

  cellHighlighted = (coords) => {
    const { puzzle } = this.props
    const { hoveredCoords, editingCoords, focusedCoords, focused } = this.state

    const value = puzzle[coords.i][coords.j]

    if (value === 0) return false

    const compareValues = ({ i, j }) => Math.abs(value) === Math.abs(puzzle[i][j])

    // Give preference to mouse hover, then editing, then focused
    if (hoveredCoords) return compareValues(hoveredCoords)
    if (editingCoords) return compareValues(editingCoords)
    if (focused) return compareValues(focusedCoords)

    return false
  }

  cellFocused = ({ i, j }) => {
    const { focusedCoords, focused, editing } = this.state
    return focused && !editing && focusedCoords.i === i && focusedCoords.j === j
  }

  reset () {
    this.setState({ focusedCoords: { i: 0, j: 0 } })
  }

  renderGrid () {
    const { puzzle, cell: Cell } = this.props
    const { focusedCoords } = this.state

    /* eslint-disable react/no-array-index-key */
    /* eslint-disable jsx-a11y/mouse-events-have-key-events */
    const tableBody = ({ getRootProps, getCellProps }) => (
      <TableStyles {...getRootProps()}>
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
                      onMenuShow: this.handleCellMenuShow,
                      onMenuDismiss: this.handleCellMenuDismiss,
                      onMouseEnter: this.handleCellMouseEnter,
                      onMouseLeave: this.handleCellMouseLeave,
                      highlighted: this.cellHighlighted({ i, j }),
                      focused: this.cellFocused({ i, j })
                    })}
                  />
                </TdStyles>
              ))}
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
        onFocus={this.handleDataGridFocus}
        onBlur={this.handleDataGridBlur}
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
export default connect(mapStateToProps, null, null, { forwardRef: true })(ThemeableBoard)
