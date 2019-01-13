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
    onResetPuzzle: PropTypes.func,
    submittedPuzzle: PropTypes.bool,
    filledPuzzle: PropTypes.bool
  }

  static defaultProps = {
    requestPuzzle: () => {},
    onRequestPuzzle: () => {},
    resetPuzzle: () => {},
    onResetPuzzle: () => {},
    submittedPuzzle: false,
    filledPuzzle: false
  }

  state = {
    open: false
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.submittedPuzzle && !nextProps.submittedPuzzle && !nextProps.filledPuzzle) {
      this._trigger.focus()
    }
  }

  setTrayStatus (open) {
    this.setState({ open })
  }

  _trigger = null

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

  handleTriggerRef = el => {
    this._trigger = el
  }

  render () {
    return (
      <div>
        <button
          ref={this.handleTriggerRef}
          onClick={this.handleMenuTriggerClick}
        >
          Open menu
        </button>
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

const mapStateToProps = state => state.puzzle

export default connect(mapStateToProps, { requestPuzzle, resetPuzzle })(AppMenu)
