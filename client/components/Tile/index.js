import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Tile extends Component {
  static propTypes = {
    value: PropTypes.number,
    onClick: PropTypes.func,
    selected: PropTypes.bool,
    onKeyDown: PropTypes.func
  }

  static defaultProps = {
    value: null,
    selected: false,
    onClick: () => {},
    onKeyDown: () => {}
  }

  componentWillUpdate (nextProps) {
    if (!this.props.selected && nextProps.selected) {
      this._content.focus()
    }
  }

  _content = null

  handleClick = (event) => {
    const { onClick, value } = this.props
    onClick(event, value)
  }

  render () {
    const {
      value,
      selected,
      onKeyDown
    } = this.props

    const props = {
      tabIndex: selected ? 0 : -1,
      onKeyDown,
      ref: (el) => { this._content = el }
    }

    let tile
    if (value < 0) {
      tile = <span {...props}>{`preset value: ${value * -1} ${selected}`}</span>
    } else if (value === 0) {
      tile = (
        <button
          onClick={this.handleClick}
          {...props}
        >
          {`add tile ${selected}`}
        </button>
      )
    } else {
      tile = (
        <button
          onClick={this.handleClick}
          {...props}
        >
          {`${value} ${selected}`}
        </button>
      )
    }
    return tile
  }
}

export default Tile
