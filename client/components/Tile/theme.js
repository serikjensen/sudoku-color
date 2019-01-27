export default ({ spacing, colors, borders, typography }) => ({
  width: calculateCellSize(spacing),
  height: calculateCellSize(spacing),
  defaultColor: colors.lightest,
  defaultBackground: colors.lightest,
  swatches: colors.swatches,
  fontSize: typography.fontSize.medium,
  borderRadius: borders.radii.circular,

  focusOffset: spacing.focusOffset,
  focusBorderWidth: borders.width.large,
  focusBorderStyle: borders.style.default,
  focusBorderColor: colors.focus,
  focusBorderRadius: borders.radii.rectangular,

  editColor: colors.focus,

  removeBorderWidth: borders.width.small,
  removeBorderColor: colors.neutral,
  removeColor: colors.neutral,
  removeFocusColor: colors.focus,
  removeHoverColor: colors.focus,
  removeHoverBorderColor: colors.focus,

  highlightColor: colors.lightest,
  highlightOffset: spacing.highlightOffset,
  highlightWidth: borders.width.medium
})

const calculateCellSize = (spacing) => (
  `calc(${spacing.cellSize} - calc(${spacing.focusOffset} * 2))`
)
