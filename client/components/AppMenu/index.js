import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Tray from '@instructure/ui-overlays/lib/components/Tray'

import { requestPuzzle, resetPuzzle } from '../../actions/puzzleActions'

class AppMenu extends Component {
  static propTypes = {
    requestPuzzle: PropTypes.func,
    onRequestPuzzle: PropTypes.func,
    resetPuzzle: PropTypes.func,
    onResetPuzzle: PropTypes.func
  }

  static defaultProps = {
    requestPuzzle: () => {},
    onRequestPuzzle: () => {},
    resetPuzzle: () => {},
    onResetPuzzle: () => {}
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
    this.props.requestPuzzle()
    this.props.onRequestPuzzle()
    this.setTrayStatus(false)
  }

  handleResetPuzzle = () => {
    this.props.resetPuzzle()
    this.props.onResetPuzzle()
    this.setTrayStatus(false)
  }

  render () {
    return (
      <div>
        <button onClick={this.handleMenuTriggerClick}>Open menu</button>
        <Tray
          label="Menu"
          open={this.state.open}
          placement="end"
        >
          <div>
            <button onClick={this.handleTrayCloseClick}>Close menu</button>
            <h2>Sudoku Color</h2>
            <button onClick={this.handleResetPuzzle}>Reset</button>
            <button onClick={this.handleNewPuzzle}>New puzzle</button>
          </div>
        </Tray>
      </div>
    )
  }
}

export default connect(null, { requestPuzzle, resetPuzzle })(AppMenu)
