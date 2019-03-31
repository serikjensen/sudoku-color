import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import '@instructure/ui-themes/lib/canvas'

import View from '@instructure/ui-layout/lib/components/View'

import AppThemeProvider from '../theming/AppThemeProvider'

import Board from '../Board'
import AppMenu from '../AppMenu'
import SubmitModal from '../SubmitModal'
import { requestPuzzle } from '../../actions/puzzleActions'

import {
  GlobalStyles,
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
        <div style={{ background: 'black' }}>
          <View display="block" borderWidth="small" height="10rem" background="default" margin="large">
            Hello some View content
          </View>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state.puzzle

export default connect(mapStateToProps, { requestPuzzle })(SudokuColorApp)
