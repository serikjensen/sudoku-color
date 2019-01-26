export default ({ spacing, borders, colors }) => ({
  width: spacing.cellSize,
  height: spacing.cellSize,
  borderWidthSmall: borders.width.small,
  borderWidthMedium: borders.width.medium,
  borderStyle: borders.style.default,
  borderColor: colors.neutral
})
