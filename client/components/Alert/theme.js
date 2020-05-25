export default ({ colors, borders, shadows, typography }) => ({
  color: colors.dark,
  background: colors.lightest,
  borderWidth: borders.width.small,
  borderStyle: borders.style.default,
  borderColor: colors.primary,
  borderRadius: '0.25rem',
  shadow: shadows.resting,
  iconColor: colors.lightest,
  iconBackground: colors.primary,
  iconFontSize: typography.fontSize.medium
})
