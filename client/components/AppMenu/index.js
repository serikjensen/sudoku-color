import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Tray from '@instructure/ui-overlays/lib/components/Tray'

class AppMenu extends Component {
  static propTypes = {
    onRequestNewPuzzle: PropTypes.func
  }

  static defaultProps = {
    onRequestNewPuzzle: () => {}
  }

  state = {
    open: false
  }

  setTrayStatus (open) {
    this.setState({ open })
  }

  handleMenuTriggerClick = () => {
    this.setTrayStatus(true)
  }

  handleTrayCloseClick = () => {
    this.setTrayStatus(false)
  }

  handleNewPuzzle = () => {
    this.props.onRequestNewPuzzle()
    this.setTrayStatus(false)
  }

  render () {
    return (
      <div>
        <button onClick={this.handleMenuTriggerClick}>Open menu</button>
        <Tray
          open={this.state.open}
          placement="end"
        >
          <div>
            <button onClick={this.handleTrayCloseClick}>Close menu</button>
            <h2>Sudoku Color</h2>
            <button onClick={this.handleNewPuzzle}>New puzzle</button>
          </div>
        </Tray>
      </div>
    )
  }
}

export default AppMenu
