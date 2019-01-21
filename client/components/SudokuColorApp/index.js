import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import '@instructure/ui-themes/lib/canvas'

import Board from '../Board'
import AppMenu from '../AppMenu'
import SubmitModal from '../SubmitModal'
import { requestPuzzle } from '../../actions/puzzleActions'

import {
  GlobalStyles,
  AppContentStyles,
  AppMainStyles,
  AppHeaderStyles,
  AppBodyStyles
} from './styles'

import baseTheme from '../../themes/base'

class SudokuColorApp extends Component {
  static propTypes = {
    requestingPuzzle: PropTypes.bool,
    requestPuzzle: PropTypes.func
  }

  static defaultProps = {
    requestingPuzzle: true,
    requestPuzzle: () => {}
  }

  componentDidMount () {
    this.props.requestPuzzle()
  }

  _board = null

  handleBoardRef = (el) => {
    this._board = el.getWrappedInstance()
  }

  handleResetPuzzle = () => {
    this._board.reset()
  }

  render () {
    return (
      <div>
        <GlobalStyles />
        <ThemeProvider theme={baseTheme}>
          <AppContentStyles>
            <AppMainStyles>
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
            </AppMainStyles>
          </AppContentStyles>
        </ThemeProvider>
      </div>
    )
  }
}

const mapStateToProps = state => state.puzzle

export default connect(mapStateToProps, { requestPuzzle })(SudokuColorApp)
