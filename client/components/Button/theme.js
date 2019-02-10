export default ({ spacing, colors, typography, borders, shadows, transitions }) => ({
  width: 'initial',
  height: spacing.formFieldHeight,
  padding: '0 2rem',
  fontSize: typography.fontSize.large,
  borderWidth: borders.width.medium,
  borderStyle: borders.style.default,
  borderRadiusCircular: borders.radii.circular,
  borderRadiusRectangular: borders.radii.rectangular,
  lineHeight: 0.5,

  background: colors.lightest,
  hoverColor: colors.lightest,

  shadow: shadows.inner,

  transitionDuration: transitions.duration,

  primary: {
    color: colors.primary,
    borderColor: colors.primary,
    background: colors.lightest,

    hoverColor: colors.lightest,
    focusColor: colors.primary,
    activeColor: colors.lightest,
    hoverBackground: colors.primary
  },

  secondary: {
    color: colors.secondary,
    borderColor: colors.secondary,
    background: colors.lightest,

    hoverColor: colors.lightest,
    focusColor: colors.secondary,
    activeColor: colors.lightest,
    hoverBackground: colors.secondary
  },

  neutral: {
    color: colors.neutral,
    borderColor: colors.neutral,
    background: colors.lightest,

    hoverColor: colors.lightest,
    focusColor: colors.neutral,
    activeColor: colors.lightest,
    hoverBackground: colors.neutral
  }
})
