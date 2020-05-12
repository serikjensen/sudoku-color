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

import IconButton from '../IconButton'

import {
  AppContentStyles,
  AppHeaderStyles,
  AppBodyStyles
} from './styles'

import baseTheme from '../../themes/base'

class SudokuColorApp extends PureComponent {
  _board = null

  _menuTrigger = null

  static propTypes = {
    requestingPuzzle: PropTypes.bool,
    loadPuzzle: PropTypes.func,
    undoSetTile: PropTypes.func,
    board: PropTypes.elementType,
    appMenu: PropTypes.elementType,
    submitModal: PropTypes.elementType,
    canUndo: PropTypes.bool
  }

  static defaultProps = {
    requestingPuzzle: true,
    loadPuzzle: () => {},
    undoSetTile: () => {},
    board: ConnectedBoard,
    appMenu: ConnectedAppMenu,
    submitModal: ConnectedSubmitModal,
    canUndo: false
  }

  componentDidMount () {
    this.props.loadPuzzle()

    document.addEventListener('keydown', this.handleDocumentKeyDown)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.canUndo && !this.props.canUndo) {
      this._menuTrigger && this._menuTrigger.focus()
    }
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleDocumentKeyDown)
  }

  handleDocumentKeyDown = (event) => {
    // Enable undo keyboard shortcut
    const { keyCode, metaKey, ctrlKey } = event

    if (keyCode === 90 && (metaKey || ctrlKey)) {
      this.handleUndo()
    }
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
      canUndo
    } = this.props

    return (
      <div>
        <AppThemeProvider theme={baseTheme}>
          <AppContentStyles>
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
                {!this.props.requestingPuzzle
                  ? <Board ref={this.handleBoardRef} />
                  : 'Loading'
                }
              </AppBodyStyles>
              <SubmitModal
                onRequestPuzzle={this.handleResetPuzzle}
                onResetPuzzle={this.handleResetPuzzle}
                onModalClose={this.handleModalClose}
              />
            </div>
          </AppContentStyles>
        </AppThemeProvider>
      </div>
    )
  }
}

const mapStateToProps = state => state.puzzle

export { SudokuColorApp }
export default connect(mapStateToProps, { loadPuzzle, undoSetTile })(SudokuColorApp)
