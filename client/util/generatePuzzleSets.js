import { generateEmptyPuzzle } from './generatePuzzle'

export default function generatePuzzleSets (puzzle) {
  const sets = [
    ...generateRowSets(puzzle),
    ...generateColumnSets(puzzle),
    ...generateSectorSets(puzzle)
  ]

  return sets
}

function cleanValues (values) {
  // remove zeros, convert negative values to positive values
  return values.filter(value => value !== 0).map(value => (value < 0 ? value * -1 : value))
}

function generateRowSets (puzzle) {
  return puzzle.map(row => new Set(cleanValues(row)))
}

function generateColumnSets (puzzle) {
  const transformedPuzzle = generateEmptyPuzzle()

  puzzle.forEach((row, i) => {
    row.forEach((value, j) => {
      transformedPuzzle[j][i] = value
    })
  })

  return transformedPuzzle.map(column => new Set(cleanValues(column)))
}

function generateSectorSets (puzzle) {
  const sectors = []
  const sectorIndices = [1, 4, 7]

  puzzle.forEach((row, i) => {
    row.forEach((value, j) => {
      if (sectorIndices.includes(i) && sectorIndices.includes(j)) {
        const sector = []

        sector.push(puzzle[i - 1][j - 1])
        sector.push(puzzle[i - 1][j])
        sector.push(puzzle[i - 1][j + 1])
        sector.push(puzzle[i][j - 1])
        sector.push(puzzle[i][j])
        sector.push(puzzle[i][j + 1])
        sector.push(puzzle[i + 1][j - 1])
        sector.push(puzzle[i + 1][j])
        sector.push(puzzle[i + 1][j + 1])

        sectors.push(sector)
      }
    })
  })

  return sectors.map(sector => new Set(cleanValues(sector)))
}
