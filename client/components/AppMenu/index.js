import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { IconHamburgerLine, IconXLine } from '@instructure/ui-icons'

import {
  REALLY_EASY,
  EASY,
  MEDIUM,
  HARD
} from '../../constants/difficultyTypes'

import Tray from '../util/Tray'
import RadioInputGroup from '../util/RadioInputGroup'
import RadioInput from '../util/RadioInput'
import AppLogo from '../AppLogo'
import Button from '../Button'
import IconButton from '../IconButton'

import { requestPuzzle, resetPuzzle } from '../../actions/puzzleActions'
import { setDifficultyPreference } from '../../actions/userSettingsActions'

import {
  TrayStyles,
  CloseButtonStyles,
  HeaderStyles,
  SettingsStyles
} from './styles'

import alert from '../../util/alert'

class AppMenu extends PureComponent {
  _trigger = null

  _clearAlert = null

  static propTypes = {
    requestPuzzle: PropTypes.func,
    onRequestPuzzle: PropTypes.func,
    resetPuzzle: PropTypes.func,
    onResetPuzzle: PropTypes.func,
    submittedPuzzle: PropTypes.bool,
    filledPuzzle: PropTypes.bool,
    triggerRef: PropTypes.func,
    setDifficultyPreference: PropTypes.func,
    difficultyPreference: PropTypes.oneOf([
      REALLY_EASY,
      EASY,
      MEDIUM,
      HARD
    ])
  }

  static defaultProps = {
    requestPuzzle: () => { },
    onRequestPuzzle: () => { },
    resetPuzzle: () => { },
    onResetPuzzle: () => { },
    submittedPuzzle: false,
    filledPuzzle: false,
    triggerRef: () => {},
    setDifficultyPreference: () => {},
    difficultyPreference: REALLY_EASY
  }

  state = {
    open: false
  }

  componentDidUpdate (prevProps) {
    if (prevProps.submittedPuzzle && !this.props.submittedPuzzle && !this.props.filledPuzzle) {
      this._trigger.focus()
    }
  }

  setTrayStatus (open) {
    this._trigger.focus()
    this.setState({ open })
  }

  handleMenuTriggerClick = () => {
    this.setTrayStatus(true)
  }

  handleTrayClose = () => {
    this.setTrayStatus(false)
  }

  handleNewPuzzle = () => {
    this.props.requestPuzzle(this.props.difficultyPreference)
    this.props.onRequestPuzzle()
    this.setTrayStatus(false)
  }

  handleResetPuzzle = () => {
    this.props.resetPuzzle()
    this.props.onResetPuzzle()
    this.setTrayStatus(false)
  }

  handleTriggerRef = el => {
    this.props.triggerRef(el)
    this._trigger = el
  }

  handleSetDifficulty = (event, value) => {
    this.props.setDifficultyPreference(value)

    if (typeof this._clearAlert === 'function') {
      this._clearAlert()
    }

    this._clearAlert = alert({
      children: [
        'Updated your difficulty setting! The next time you start a new puzzle',
        `it will be set to ${value.toLowerCase().replace('_', ' ')}.`
      ].join(' '),
      duration: 6000
    })
  }

  renderSelectDifficulty () {
    return (
      <RadioInputGroup
        description="Puzzle Difficulty"
        name="difficulty"
        value={this.props.difficultyPreference}
        onChange={this.handleSetDifficulty}
      >
        <RadioInput value={REALLY_EASY} label="Really Easy" />
        <RadioInput value={EASY} label="Easy" />
        <RadioInput value={MEDIUM} label="Medium" />
        <RadioInput value={HARD} label="Hard" />
      </RadioInputGroup>
    )
  }

  render () {
    return (
      <div>
        <IconButton
          ref={this.handleTriggerRef}
          onClick={this.handleMenuTriggerClick}
          label="Open menu"
          color="neutral"
          icon={() => <IconHamburgerLine />}
        />
        <Tray
          label="Menu"
          open={this.state.open}
          placement="start"
          onDismiss={this.handleTrayClose}
        >
          <TrayStyles>
            <CloseButtonStyles>
              <IconButton
                onClick={this.handleTrayClose}
                label="Close menu"
                color="neutral"
                icon={() => <IconXLine />}
              />
            </CloseButtonStyles>
            <HeaderStyles>
              <AppLogo />
            </HeaderStyles>
            <Button
              color="primary"
              display="block"
              onClick={this.handleResetPuzzle}
            >
              Reset
            </Button>
            <Button
              color="secondary"
              display="block"
              onClick={this.handleNewPuzzle}
              margin="0.5rem 0 0 0"
            >
              New Puzzle
            </Button>
            <SettingsStyles>Settings</SettingsStyles>
            {this.renderSelectDifficulty()}
          </TrayStyles>
        </Tray>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.puzzle,
  ...state.userSettings
})

export { AppMenu }
export default connect(mapStateToProps, { requestPuzzle, resetPuzzle, setDifficultyPreference })(AppMenu)
