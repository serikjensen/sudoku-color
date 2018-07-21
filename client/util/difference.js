/*
* Given two arrays a and b, returns the boolean difference
*/
export default function difference (a, b) {
  return [...a].filter(value => !b.includes(value))
}
