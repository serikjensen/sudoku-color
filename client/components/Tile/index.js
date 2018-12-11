import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Tile extends Component {
  static propTypes = {
    value: PropTypes.number,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    tabIndex: PropTypes.number,
    coords: PropTypes.shape({
      i: PropTypes.number.isRequired,
      j: PropTypes.number.isRequired
    }).isRequired
  }

  static defaultProps = {
    value: null,
    onClick: () => {},
    onKeyDown: () => {},
    tabIndex: -1
  }

  componentWillUpdate (nextProps) {
    if (this.props.tabIndex === -1 && nextProps.tabIndex === 0) {
      this._content.focus()
    }
  }

  _content = null

  handleClick = (event) => {
    const { onClick, value, coords } = this.props
    onClick(event, coords, value)
  }

  handleKeyDown = (event) => {
    const { onKeyDown, value, coords } = this.props
    onKeyDown(event, coords, value)
  }

  render () {
    const {
      value,
      tabIndex
    } = this.props

    const props = {
      tabIndex,
      onKeyDown: this.handleKeyDown,
      onClick: this.handleClick,
      ref: (el) => { this._content = el }
    }

    let tile
    if (value < 0) {
      tile = <span {...props}>{`preset value: ${value * -1} ${tabIndex === 0}`}</span>
    } else if (value === 0) {
      tile = (
        <button {...props}>{`add tile ${tabIndex === 0}`}</button>
      )
    } else {
      tile = (
        <button {...props}>{`${value} ${tabIndex === 0}`}</button>
      )
    }
    return tile
  }
}

export default Tile
