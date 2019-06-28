export default ({ spacing, colors, typography }) => ({
  widthLarge: calculateLargeCellSize(spacing),
  heightLarge: calculateLargeCellSize(spacing),
  widthMedium: calculateMediumCellSize(spacing),
  heightMedium: calculateMediumCellSize(spacing),
  widthSmall: calculateSmallCellSize(spacing),
  heightSmall: calculateSmallCellSize(spacing),
  background: colors.lightest,
  swatches: colors.swatches,
  fontSize: typography.fontSize.medium,
  fontSizeSmall: typography.fontSize.small,
  fontFamily: typography.fontFamily
})

const calculateLargeCellSize = (spacing) => (
  `calc(${spacing.cellSizeLarge} - calc(${spacing.focusOffsetLarge} * 2))`
)

const calculateMediumCellSize = (spacing) => (
  `calc(${spacing.cellSizeMedium} - calc(${spacing.focusOffsetMedium} * 2))`
)

const calculateSmallCellSize = (spacing) => (
  `calc(${spacing.cellSizeSmall} - calc(${spacing.focusOffsetSmall} * 2))`
)
