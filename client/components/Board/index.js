import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setTile } from '../../actions/puzzleActions'

class Board extends Component {
  static propTypes = {
    puzzle: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
  }

  handleSetTile = (coords) => {
    this.props.setTile(coords, 5)
  }

  render () {
    const { puzzle } = this.props
    /* eslint-disable react/no-array-index-key */
    return (
      <table>
        <tbody>
          {puzzle.map((row, i) => (
            <tr key={`${i}`}>
              {row.map((value, j) => (
                <td key={`${j}`}>
                  {value || <button onClick={() => { this.handleSetTile({ i, j }) }}>add value</button>}
                </td>))
              }
            </tr>
          ))}
        </tbody>
      </table>
    )
    /* eslint-enable react/no-array-index-key */
  }
}

const mapStateToProps = state => state.puzzle

export default connect(
  mapStateToProps,
  { setTile }
)(Board)
