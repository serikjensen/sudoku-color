import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'

import { containsActiveElement, requestAnimationFrame } from '@instructure/ui-dom-utils'
import { createChainedFunction } from '@instructure/ui-utils'

class DataGrid extends PureComponent {
  static propTypes = {
    label: PropTypes.node.isRequired,
    render: PropTypes.func,
    onRequestMove: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    focusedCoords: PropTypes.shape({
      i: PropTypes.number.isRequired,
      j: PropTypes.number.isRequired
    })
  }

  static defaultProps = {
    render: () => null,
    onRequestMove: () => {},
    onFocus: () => {},
    onBlur: () => {},
    focusedCoords: { i: 0, j: 0 }
  }

  componentWillUnmount () {
    this._raf.forEach(request => request.cancel())
    this._raf = []
  }

  _root = null
  _raf = []

  handleRootRef = (el) => {
    this._root = el
  }

  handleFocus = (e) => {
    this.props.onFocus(e)
  }

  handleBlur = (e) => {
    this._raf.push(requestAnimationFrame(() => {
      if (!containsActiveElement(this._root)) {
        this.props.onBlur(e)
      }
    }))
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
      focusedCoords,
      render
    } = this.props

    const getRootProps = ({ onFocus, onBlur, ref, ...props } = {}) => ({
      onFocus: createChainedFunction(onFocus, this.handleFocus),
      onBlur: createChainedFunction(onBlur, this.handleBlur),
      ref: createChainedFunction(ref, this.handleRootRef),
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

    return render({ getRootProps, getCellProps })
  }
}

export default DataGrid
