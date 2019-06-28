export default ({ spacing, colors, borders }) => ({
  offsetLarge: spacing.focusOffsetLarge,
  offsetMedium: spacing.focusOffsetMedium,
  offsetSmall: spacing.focusOffsetSmall,

  borderWidth: borders.width.large,
  borderStyle: borders.style.default,
  borderColor: colors.focus,
  borderRadiusRectangular: borders.radii.rectangular,
  borderRadiusCircular: borders.radii.circular
})
