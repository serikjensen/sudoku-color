import getSudokuPuzzle from '../util/getSudokuPuzzle'
import { setTile } from '../util/sudokuOps'
import { SET_TILE } from '../constants/actionTypes'

const defaultState = {
  puzzle: getSudokuPuzzle()
}

export default function reducer (state = defaultState, action) {
  switch (action.type) {
    case SET_TILE: {
      return { puzzle: setTile(state.puzzle, action.coords, action.value) }
    }
    default: {
      return state
    }
  }
}
