import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Modal from '../util/Modal'
import Button from '../Button'

import {
  requestPuzzle,
  resetPuzzle,
  submitPuzzle,
  continuePuzzle
} from '../../actions/puzzleActions'

class SubmitModal extends PureComponent {
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
        {this.props.filledPuzzle && <Button color="secondary" onClick={this.handleSubmitPuzzle}>Submit puzzle</Button>}
        <Modal
          open={this.props.submittedPuzzle}
          onDismiss={this.handleModalDismiss}
          label="Submitted puzzle"
          shouldCloseOnDocumentClick
        >
          {this.props.validPuzzle ? <div>Puzzle is correct</div> : <div>Puzzle is incorrect</div>}
          <button type="button" onClick={this.handleModalDismiss}>close</button>
          <Button onClick={this.handleResetPuzzle}>Reset</Button>
          <Button color="secondary" onClick={this.handleNewPuzzle}>New Puzzle</Button>
        </Modal>
      </span>
    )
  }
}

const mapStateToProps = state => state.puzzle

export { SubmitModal }
export default connect(mapStateToProps, { requestPuzzle, resetPuzzle, submitPuzzle, continuePuzzle })(SubmitModal)
