import { Component } from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'

import createChainedFunction from '@instructure/ui-utils/lib/createChainedFunction'

class DataGrid extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
    children: PropTypes.func,
    render: PropTypes.func
  }

  static defaultProps = {
    children: () => null,
    render: () => null
  }

  state = {
    selectedCoords: { i: 0, j: 0 }
  }

  get table () {
    // TODO: Account for nested tables/table headers
    return [...this._table.querySelectorAll('tr')]
      .map((row) => [...row.querySelectorAll('td')])
  }

  get width () {
    return (this.table && this.table.length) || 0
  }

  get height () {
    return (this.table && this.table[0] && this.table[0].length) || 0
  }

  _table = null

  handleClick = (e, coords) => {
    this.setState({ selectedCoords: { i: coords.i, j: coords.j } })
  }

  handleKeyDown = (e, coords) => {
    const key = keycode(e.keyCode)
    if (['right', 'left', 'down', 'up'].includes(key)) {
      this.arrowMove(key, coords)
    }
  }

  arrowMove = (key, coords) => {
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
      let i = coords.i + move.i
      let j = coords.j + move.j
      i = i < 0 ? 0 : i
      j = j < 0 ? 0 : j
      i = i > this.width ? this.width : i
      j = j > this.height ? this.height : j
      return { selectedCoords: this.isValidIndex({ i, j }) ? { i, j } : coords }
    })
  }

  isValidIndex ({ i, j }) {
    const { table } = this
    return !!(table && table[i] && table[i][j])
  }

  render () {
    const { label, children, render = children } = this.props
    const { selectedCoords } = this.state

    const getTableProps = (props) => ({
      role: 'grid',
      'aria-label': label,
      ref: (el) => { this._table = el },
      ...props
    })

    const getCellProps = ({ onKeyDown, onClick, coords, ...props }) => ({
      onKeyDown: createChainedFunction(onKeyDown, this.handleKeyDown),
      onClick: createChainedFunction(onClick, this.handleClick),
      tabIndex: (coords.i === selectedCoords.i && coords.j === selectedCoords.j) ? 0 : -1,
      ...props
    })

    return render({ getTableProps, getCellProps })
  }
}

export default DataGrid
export { default as DataGridItem } from './DataGridItem'
