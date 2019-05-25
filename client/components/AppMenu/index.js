import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { IconHamburgerLine, IconXLine } from '@instructure/ui-icons'

import Tray from '../util/Tray'
import AppLogo from '../AppLogo'
import Button from '../Button'
import IconButton from '../IconButton'

import { requestPuzzle, resetPuzzle } from '../../actions/puzzleActions'

import {
  TrayStyles,
  CloseButtonStyles,
  HeaderStyles
} from './styles'

class AppMenu extends PureComponent {
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
    this.setState({ open }, () => {
      this._trigger.focus()
    })
  }

  _trigger = null

  handleMenuTriggerClick = () => {
    this.setTrayStatus(true)
  }

  handleTrayClose = () => {
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
          placement="end"
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
          </TrayStyles>
        </Tray>
      </div>
    )
  }
}

const mapStateToProps = state => state.puzzle

export { AppMenu }
export default connect(mapStateToProps, { requestPuzzle, resetPuzzle })(AppMenu)
