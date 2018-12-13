import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'

import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
import PresentationContent from '@instructure/ui-a11y/lib/components/PresentationContent'

class Tile extends Component {
  static propTypes = {
    value: PropTypes.number,
    label: PropTypes.node,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    tabIndex: PropTypes.number,
    active: PropTypes.bool,
    coords: PropTypes.shape({
      i: PropTypes.number.isRequired,
      j: PropTypes.number.isRequired
    }).isRequired
  }

  static defaultProps = {
    value: null,
    label: null,
    onClick: () => {},
    onKeyDown: () => {},
    tabIndex: -1,
    active: false
  }

  componentWillUpdate (nextProps) {
    const { tabIndex, active } = this.props
    if (tabIndex === -1 && nextProps.tabIndex === 0 && active) {
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

  handleContentRef = (el) => {
    this._content = el
  }

  render () {
    const {
      value,
      label,
      tabIndex,
      ...props
    } = this.props

    const ElementType = value < 0 ? 'span' : 'button'
    const presentationValue = value < 0 ? value * -1 : value

    return (
      <ElementType
        tabIndex={tabIndex}
        onKeyDown={this.handleKeyDown}
        onClick={this.handleClick}
        ref={this.handleContentRef}
        {...omitProps(props, Tile.propTypes)}
      >
        <ScreenReaderContent>{label || presentationValue}</ScreenReaderContent>
        <PresentationContent>{presentationValue}</PresentationContent>
      </ElementType>
    )
  }
}

export default Tile
