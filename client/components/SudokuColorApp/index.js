import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import '@instructure/canvas-theme'

import { IconResetLine } from '@instructure/ui-icons'

import AppThemeProvider from '../theming/AppThemeProvider'

import ConnectedBoard from '../Board'
import ConnectedAppMenu from '../AppMenu'
import ConnectedSubmitModal from '../SubmitModal'
import { loadPuzzle, undoSetTile } from '../../actions/puzzleActions'
import { loadUserSettings } from '../../actions/userSettingsActions'

import { USER_SETTINGS_KEY } from '../../constants/storageTypes'

import IconButton from '../IconButton'
import Loading from '../Loading'
import AppContent from '../AppContent'

import {
  AppHeaderStyles,
  AppBodyStyles
} from './styles'

import themes from '../../themes'

class SudokuColorApp extends PureComponent {
  _board = null

  _menuTrigger = null

  _timeout = null

  static propTypes = {
    requestingPuzzle: PropTypes.bool,
    isLoadingUserSettings: PropTypes.bool,
    loadPuzzle: PropTypes.func,
    loadUserSettings: PropTypes.func,
    undoSetTile: PropTypes.func,
    board: PropTypes.elementType,
    appMenu: PropTypes.elementType,
    submitModal: PropTypes.elementType,
    canUndo: PropTypes.bool,
    loadingIndicator: PropTypes.elementType,
    themeKey: PropTypes.string
  }

  static defaultProps = {
    requestingPuzzle: true,
    isLoadingUserSettings: true,
    loadPuzzle: () => {},
    loadUserSettings: () => {},
    undoSetTile: () => {},
    board: ConnectedBoard,
    appMenu: ConnectedAppMenu,
    submitModal: ConnectedSubmitModal,
    canUndo: false,
    loadingIndicator: Loading,
    themeKey: null
  }

  componentDidMount () {
    // I spent a lot of time on that damn loading animation, but the puzzles
    // load too fast to see it :) So give people a glimpse of my hard work
    // by setting a timeout
    this._timeout = setTimeout(() => {
      this.props.loadPuzzle()
      this.props.loadUserSettings()
    }, 1000)

    document.addEventListener('keydown', this.handleDocumentKeyDown)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.canUndo && !this.props.canUndo) {
      this._menuTrigger && this._menuTrigger.focus()
    }
  }

  componentWillUnmount () {
    clearTimeout(this._timeout)

    document.removeEventListener('keydown', this.handleDocumentKeyDown)
  }

  handleDocumentKeyDown = (event) => {
    // Enable undo keyboard shortcut
    const { keyCode, metaKey, ctrlKey } = event

    if (keyCode === 90 && (metaKey || ctrlKey)) {
      this.handleUndo()
    }
  }

  getLoadingThemeKey = () => {
    // Load the theme from local storage if one exists
    let themeKey = 'base'

    try {
      const savedUserSettingsData = localStorage.getItem(USER_SETTINGS_KEY)

      if (savedUserSettingsData) {
        const savedUserSettings = JSON.parse(savedUserSettingsData)
        themeKey = (savedUserSettings || {}).themeKey
      }
    } catch (err) {
      themeKey = 'base'
    }

    return themeKey
  }

  handleBoardRef = (el) => {
    this._board = el
  }

  handleMenuTriggerRef = (el) => {
    this._menuTrigger = el
  }

  handleResetPuzzle = () => {
    this._board && this._board.reset()
  }

  handleUndo = () => {
    this.props.undoSetTile()
  }

  render () {
    const {
      board: Board,
      appMenu: AppMenu,
      submitModal: SubmitModal,
      loadingIndicator: LoadingIndicator,
      canUndo,
      themeKey
    } = this.props

    return (
      <div>
        <AppThemeProvider theme={themes[themeKey || this.getLoadingThemeKey()]}>
          <AppContent>
            {!this.props.requestingPuzzle && !this.props.isLoadingUserSettings ? (
              <div>
                <AppHeaderStyles>
                  <AppMenu
                    onRequestPuzzle={this.handleResetPuzzle}
                    onResetPuzzle={this.handleResetPuzzle}
                    triggerRef={this.handleMenuTriggerRef}
                  />
                  {canUndo && (
                    <IconButton
                      onClick={this.handleUndo}
                      label="Undo"
                      icon={() => <IconResetLine style={{ transform: 'rotate(-45deg) scale(-1,1)' }} />}
                      color="neutral"
                    />
                  )}
                </AppHeaderStyles>
                <AppBodyStyles>
                  <Board ref={this.handleBoardRef} />
                </AppBodyStyles>
                <SubmitModal
                  onRequestPuzzle={this.handleResetPuzzle}
                  onResetPuzzle={this.handleResetPuzzle}
                  onModalClose={this.handleModalClose}
                />
              </div>
            ) : <LoadingIndicator />}
          </AppContent>
        </AppThemeProvider>
        <div id="visible-alerts" />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.puzzle,
  ...state.userSettings
})

export { SudokuColorApp }
export default connect(mapStateToProps, { loadUserSettings, loadPuzzle, undoSetTile })(SudokuColorApp)
