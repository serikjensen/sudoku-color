import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import '@instructure/canvas-theme'

import AppThemeProvider from '../theming/AppThemeProvider'

import Board from '../Board'
import AppMenu from '../AppMenu'
import SubmitModal from '../SubmitModal'
import { requestPuzzle } from '../../actions/puzzleActions'

import {
  AppContentStyles,
  AppHeaderStyles,
  AppBodyStyles
} from './styles'

import baseTheme from '../../themes/base'

class SudokuColorApp extends PureComponent {
  static propTypes = {
    requestingPuzzle: PropTypes.bool,
    requestPuzzle: PropTypes.func
  }

  static defaultProps = {
    requestingPuzzle: true,
    requestPuzzle: () => {}
  }

  _board = null

  componentDidMount () {
    this.props.requestPuzzle()
  }

  handleBoardRef = (el) => {
    this._board = el
  }

  handleResetPuzzle = () => {
    this._board && this._board.reset()
  }

  render () {
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
export default connect(mapStateToProps, { requestPuzzle })(SudokuColorApp)
