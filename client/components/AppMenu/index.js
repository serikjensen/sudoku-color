import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Tray from '@instructure/ui-overlays/lib/components/Tray'

import { requestPuzzle } from '../../actions/puzzleActions'

class AppMenu extends Component {
  static propTypes = {
    requestPuzzle: PropTypes.func
  }

  static defaultProps = {
    requestPuzzle: () => {}
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
            <button onClick={this.handleNewPuzzle}>New puzzle</button>
          </div>
        </Tray>
      </div>
    )
  }
}

export default connect(null, { requestPuzzle })(AppMenu)
