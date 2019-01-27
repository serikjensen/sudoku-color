export default ({ spacing, colors, typography, borders, shadows, transitions }) => ({
  height: spacing.formFieldHeight,
  fontSize: typography.fontSize.large,
  borderWidth: borders.width.medium,
  borderStyle: borders.style.default,
  borderRadius: borders.radii.circular,

  background: colors.lightest,
  hoverColor: colors.lightest,

  shadow: shadows.inner,

  transitionDuration: transitions.duration,

  primary: {
    color: colors.primary,
    borderColor: colors.primary,
    background: colors.lightest,

    hoverColor: colors.lightest,
    hoverBackground: colors.primary
  },

  secondary: {
    color: colors.secondary,
    borderColor: colors.secondary,
    background: colors.lightest,

    hoverColor: colors.lightest,
    hoverBackground: colors.secondary
  }
})
