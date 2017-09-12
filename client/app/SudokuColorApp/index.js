<<<<<<< 0db80fc99374981b16886fd427de58c550432204
import React from 'react'

export default class SudokuColorApp extends React.Component {
	render() {
		return (
			<div>
				Hello from sudoku
			</div>
		)
	}
}
=======
import React, { Component } from 'react'
import getSudokuPuzzle from '../../util/getSudokuPuzzle'

export default class SudokuColorApp extends Component {
  constructor (props) {
    super(props)
    this._puzzle = getSudokuPuzzle()
  }

  render () {
    /* eslint-disable react/no-array-index-key */
    return (
      <table>
        <tbody>
          {this._puzzle.map((row, r) => {
            return (
              <tr key={`${r}`}>
                {row.map((value, c) => {
                  return (<td key={`${c}`}>{value || 0}</td>)
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
    /* eslint-enable react/no-array-index-key */
  }
}
>>>>>>> Setup eslint
