import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import '@instructure/ui-themes/lib/canvas'

import Board from '../Board'
import AppMenu from '../AppMenu'
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

  render () {
    return (
      <span>
        <AppMenu />
        {!this.props.requestingPuzzle
          ? <Board />
          : 'Loading'
        }
        <button>foo</button>
      </span>
    )
  }
}

const mapStateToProps = state => state.puzzle

export default connect(mapStateToProps, { requestPuzzle })(SudokuColorApp)
