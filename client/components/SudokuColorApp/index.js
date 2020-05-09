import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import '@instructure/canvas-theme'

import AppThemeProvider from '../theming/AppThemeProvider'

import ConnectedBoard from '../Board'
import ConnectedAppMenu from '../AppMenu'
import ConnectedSubmitModal from '../SubmitModal'
import { loadPuzzle } from '../../actions/puzzleActions'

import {
  AppContentStyles,
  AppHeaderStyles,
  AppBodyStyles
} from './styles'

import baseTheme from '../../themes/base'

class SudokuColorApp extends PureComponent {
  _board = null

  static propTypes = {
    requestingPuzzle: PropTypes.bool,
    loadPuzzle: PropTypes.func,
    board: PropTypes.elementType,
    appMenu: PropTypes.elementType,
    submitModal: PropTypes.elementType
  }

  static defaultProps = {
    requestingPuzzle: true,
    loadPuzzle: () => {},
    board: ConnectedBoard,
    appMenu: ConnectedAppMenu,
    submitModal: ConnectedSubmitModal
  }

  componentDidMount () {
    this.props.loadPuzzle()
  }

  handleBoardRef = (el) => {
    this._board = el
  }

  handleResetPuzzle = () => {
    this._board && this._board.reset()
  }

  render () {
    const {
      board: Board,
      appMenu: AppMenu,
      submitModal: SubmitModal
    } = this.props

    return (
      <div>
        <AppThemeProvider theme={baseTheme}>
          <AppContentStyles>
            <div>
              <AppHeaderStyles>
                <SubmitModal
                  onRequestPuzzle={this.handleResetPuzzle}
                  onResetPuzzle={this.handleResetPuzzle}
                  onModalClose={this.handleModalClose}
                />
                <AppMenu
                  onRequestPuzzle={this.handleResetPuzzle}
                  onResetPuzzle={this.handleResetPuzzle}
                />
              </AppHeaderStyles>
              <AppBodyStyles>
                {!this.props.requestingPuzzle
                  ? <Board ref={this.handleBoardRef} />
                  : 'Loading'
                }
              </AppBodyStyles>
            </div>
          </AppContentStyles>
        </AppThemeProvider>
      </div>
    )
  }
}

const mapStateToProps = state => state.puzzle

export { SudokuColorApp }
export default connect(mapStateToProps, { loadPuzzle })(SudokuColorApp)
