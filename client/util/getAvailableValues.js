import VALUES from '../constants/values'
import difference from './difference'
/*
* Given an array of values, returns which values are not contained
* in the constant array of VALUES
*
* If the puzzle argument is present returns which values are available
* with respect to the entire puzzle (ex, it will omit a value if there
* already exist VALUES.length count of it)
*/
export default function (values, puzzle) {
  let omitValues = values

  if (puzzle) {
    // get count of every instance of value in the puzzle
    const counter = {}
    puzzle.forEach((row) => {
      row.forEach((value) => {
        const result = value < 0 ? value * -1 : value

        if (result > 0) {
          counter[result] = counter[result] ? counter[result] + 1 : 1
        }
      })
    })

    const unavailableValues = []
    Object.keys(counter).forEach((key) => {
      if (counter[key] >= VALUES.length) {
        unavailableValues.push(parseInt(key, 10))
      }
    })

    omitValues = [...omitValues, ...unavailableValues]
  }

  return difference(VALUES, omitValues)
}
