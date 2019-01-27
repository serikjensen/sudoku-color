export default ({ spacing, colors, borders }) => ({
  offset: spacing.focusOffset,
  borderWidth: borders.width.large,
  borderStyle: borders.style.default,
  borderColor: colors.focus,
  borderRadiusRectangular: borders.radii.rectangular,
  borderRadiusCircular: borders.radii.circular
})
