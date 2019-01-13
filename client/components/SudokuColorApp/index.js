import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import '@instructure/ui-themes/lib/canvas'

import Board from '../Board'
import AppMenu from '../AppMenu'
import SubmitModal from '../SubmitModal'
import { requestPuzzle } from '../../actions/puzzleActions'

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
      <span>
        <SubmitModal
          onRequestPuzzle={this.handleResetPuzzle}
          onResetPuzzle={this.handleResetPuzzle}
          onModalClose={this.handleModalClose}
        />
        <AppMenu
          onRequestPuzzle={this.handleResetPuzzle}
          onResetPuzzle={this.handleResetPuzzle}
        />
        {!this.props.requestingPuzzle
          ? <Board ref={this.handleBoardRef} />
          : 'Loading'
        }
        <button>foo</button>
      </span>
    )
  }
}

const mapStateToProps = state => state.puzzle

export default connect(mapStateToProps, { requestPuzzle })(SudokuColorApp)
