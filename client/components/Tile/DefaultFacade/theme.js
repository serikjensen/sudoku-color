export default ({ spacing, colors, borders, typography }) => ({
  width: calculateCellSize(spacing),
  height: calculateCellSize(spacing),
  color: colors.lightest,
  background: colors.lightest,
  swatches: colors.swatches,
  fontSize: typography.fontSize.medium,
  fontFamily: typography.fontFamily,
  borderRadius: borders.radii.circular
})

const calculateCellSize = (spacing) => (
  `calc(${spacing.cellSize} - calc(${spacing.focusOffset} * 2))`
)
