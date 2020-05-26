import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { IconXLine } from '@instructure/ui-icons'
import { css } from '@emotion/core'

import Modal from '../util/Modal'
import Button from '../Button'
import IconButton from '../IconButton'
import ConnectedAwardHero from '../AwardHero'
import ConnectedIncorrectHero from '../IncorrectHero'

import {
  requestPuzzle,
  resetPuzzle,
  submitPuzzle,
  continuePuzzle
} from '../../actions/puzzleActions'

import {
  REALLY_EASY,
  EASY,
  MEDIUM,
  HARD
} from '../../constants/difficultyTypes'

const closeStyles = css`
  position: absolute;
  top: 1rem;
  right: 0.75rem;
`

const heroStyles = css`
  margin-top: 2rem;
  max-width: 20rem;
`

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
    onResetPuzzle: PropTypes.func,
    difficultyPreference: PropTypes.oneOf([
      REALLY_EASY,
      EASY,
      MEDIUM,
      HARD
    ]),
    awardHero: PropTypes.elementType,
    incorrectHero: PropTypes.elementType
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
    onResetPuzzle: () => {},
    difficultyPreference: REALLY_EASY,
    awardHero: ConnectedAwardHero,
    incorrectHero: ConnectedIncorrectHero
  }

  handleSubmitPuzzle = () => {
    this.props.submitPuzzle()
  }

  handleNewPuzzle = () => {
    this.props.requestPuzzle(this.props.difficultyPreference)
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
    const {
      filledPuzzle,
      submittedPuzzle,
      validPuzzle,
      awardHero: AwardHero,
      incorrectHero: IncorrectHero
    } = this.props

    return (
      <span>
        {filledPuzzle && (
          <Button
            display="block"
            color="secondary"
            onClick={this.handleSubmitPuzzle}
            margin="1rem 0 0 0"
          >
            Submit puzzle
          </Button>
        )}
        <Modal
          open={submittedPuzzle}
          onDismiss={this.handleModalDismiss}
          label="Submitted puzzle"
          shouldCloseOnDocumentClick
        >
          <div css={closeStyles}>
            <IconButton
              onClick={this.handleModalDismiss}
              label="Close"
              color="neutral"
              icon={() => <IconXLine />}
            />
          </div>
          <div css={heroStyles}>
            {validPuzzle ? <AwardHero /> : <IncorrectHero />}
          </div>
          <Button margin="0 0 0.25rem 0" display="block" onClick={this.handleResetPuzzle}>Reset</Button>
          <Button display="block" color="secondary" onClick={this.handleNewPuzzle}>New Puzzle</Button>
        </Modal>
      </span>
    )
  }
}

const mapStateToProps = state => ({
  ...state.puzzle,
  ...state.userSettings
})

export { SubmitModal }
export default connect(mapStateToProps, { requestPuzzle, resetPuzzle, submitPuzzle, continuePuzzle })(SubmitModal)
