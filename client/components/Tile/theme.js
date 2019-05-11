export default ({ spacing, colors, typography }) => ({
  width: calculateCellSize(spacing),
  height: calculateCellSize(spacing),
  defaultColor: colors.lightest,
  defaultBackground: colors.lightest,
  swatches: colors.swatches,
  fontSize: typography.fontSize.medium,
  fontFamily: typography.fontFamily
})

const calculateCellSize = (spacing) => (
  `calc(${spacing.cellSize} - calc(${spacing.focusOffset} * 2))`
)
