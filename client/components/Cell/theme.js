export default ({ spacing, borders, colors, shadows }) => ({
  widthLarge: spacing.cellSizeLarge,
  heightLarge: spacing.cellSizeLarge,
  widthMedium: spacing.cellSizeMedium,
  heightMedium: spacing.cellSizeMedium,
  widthSmall: spacing.cellSizeSmall,
  heightSmall: spacing.cellSizeSmall,
  borderWidthSmall: borders.width.small,
  borderWidthMedium: borders.width.medium,
  borderStyle: borders.style.default,
  borderColor: colors.neutral,
  background: colors.lightest,
  backgroundPresentation: colors.lightest,
  shadow: shadows.inner
})
