import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'

import { createChainedFunction } from '@instructure/ui-utils'

import { Focusable } from '@instructure/ui-focusable'

class DataGrid extends PureComponent {
  static propTypes = {
    label: PropTypes.node.isRequired,
    children: PropTypes.func,
    render: PropTypes.func,
    onRequestMove: PropTypes.func,
    focusedCoords: PropTypes.shape({
      i: PropTypes.number.isRequired,
      j: PropTypes.number.isRequired
    })
  }

  static defaultProps = {
    children: () => null,
    render: () => null,
    onRequestMove: () => {},
    focusedCoords: { i: 0, j: 0 }
  }

  handleKeyDown = (e) => {
    const { onRequestMove } = this.props

    const key = keycode(e.keyCode)

    if (['right', 'left', 'down', 'up'].includes(key)) {
      switch (key) { // eslint-disable-line default-case
        case 'right':
          onRequestMove(e, { direction: { i: 0, j: 1 } })
          break
        case 'left':
          onRequestMove(e, { direction: { i: 0, j: -1 } })
          break
        case 'up':
          onRequestMove(e, { direction: { i: -1, j: 0 } })
          break
        case 'down':
          onRequestMove(e, { direction: { i: 1, j: 0 } })
          break
      }
    }
  }

  render () {
    const {
      label,
      children,
      focusedCoords,
      render = children
    } = this.props

    const getRootProps = (props) => ({
      role: 'grid',
      'aria-label': label,
      ...props
    })

    const getCellProps = ({ coords, onKeyDown, ...props } = {}) => ({
      tabIndex: (coords.i === focusedCoords.i && coords.j === focusedCoords.j) ? 0 : -1,
      onKeyDown: createChainedFunction(onKeyDown, this.handleKeyDown),
      coords,
      ...props
    })

    return (
      <Focusable>
        {({ focused }) => render({ getRootProps, getCellProps, focused })}
      </Focusable>
    )
  }
}

export default DataGrid
