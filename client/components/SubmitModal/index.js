import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Modal, { ModalHeader, ModalBody } from '@instructure/ui-overlays/lib/components/Modal'

import { requestPuzzle, resetPuzzle, submitPuzzle, continuePuzzle } from '../../actions/puzzleActions'

class SubmitModal extends Component {
  static propTypes = {
    submitPuzzle: PropTypes.func,
    continuePuzzle: PropTypes.func,
    filledPuzzle: PropTypes.bool,
    submittedPuzzle: PropTypes.bool,
    validPuzzle: PropTypes.bool,
    requestPuzzle: PropTypes.func,
    onRequestPuzzle: PropTypes.func,
    resetPuzzle: PropTypes.func,
    onResetPuzzle: PropTypes.func
  }

  static defaultProps = {
    submitPuzzle: () => {},
    continuePuzzle: () => {},
    filledPuzzle: false,
    submittedPuzzle: false,
    validPuzzle: false,
    requestPuzzle: () => {},
    onRequestPuzzle: () => {},
    resetPuzzle: () => {},
    onResetPuzzle: () => {}
  }

  handleSubmitPuzzle = () => {
    this.props.submitPuzzle()
  }

  handleNewPuzzle = () => {
    this.props.requestPuzzle()
    this.props.onRequestPuzzle()
  }

  handleResetPuzzle = () => {
    this.props.resetPuzzle()
    this.props.onResetPuzzle()
  }

  handleModalDismiss = () => {
    this.props.continuePuzzle()
  }

  render () {
    return (
      <span>
        {this.props.filledPuzzle && <button onClick={this.handleSubmitPuzzle}>Submit puzzle</button>}
        <Modal
          open={this.props.submittedPuzzle}
          onDismiss={this.handleModalDismiss}
          label="Submitting puzzle"
          shouldCloseOnDocumentClick
        >
          <ModalHeader>
            {this.props.validPuzzle ? <h1>Puzzle is correct</h1> : <h1>Puzzle is incorrect</h1>}
          </ModalHeader>
          <ModalBody>
            <button onClick={this.handleNewPuzzle}>new puzzle</button>
            <button onClick={this.handleResetPuzzle}>reset this puzzle</button>
            <button onClick={this.handleModalDismiss}>keep working and close this</button>
          </ModalBody>
        </Modal>
      </span>
    )
  }
}

const mapStateToProps = state => state.puzzle

export default connect(mapStateToProps, { requestPuzzle, resetPuzzle, submitPuzzle, continuePuzzle })(SubmitModal)
