import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import containsActiveElement from '@instructure/ui-utils/lib/dom/containsActiveElement'
import requestAnimationFrame from '@instructure/ui-utils/lib/dom/requestAnimationFrame'

import DataGrid from '../util/DataGrid'
import Cell from '../Cell'

class Board extends PureComponent {
  static propTypes = {
    puzzle: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
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

  renderGrid () {
    const { puzzle } = this.props

    /* eslint-disable react/no-array-index-key */
    const tableBody = ({ getTableProps, getCellProps }) => (
      <table
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        {...getTableProps({
          ref: this.handleTableRef
        })}
      >
        <tbody>
          {puzzle.map((row, i) => (
            <tr key={`${i}`}>
              {row.map((value, j) => (
                <td key={`${j}`}>
                  <Cell
                    coords={{ i, j }}
                    value={value}
                    puzzle={puzzle}
                    active={this.state.active}
                    onMenuDismiss={this.handleCellMenuDismiss}
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
