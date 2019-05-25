import styled from 'styled-components'
import composeTheme from './theme'
import themeable from '../theming/themeable'

const TrayStyles = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.borderPadding};
`
const ThemeableTrayStyles = themeable(TrayStyles, composeTheme)
export { ThemeableTrayStyles as TrayStyles }

const HeaderStyles = styled.div`
  margin-top: ${({ theme }) => theme.headerMarginTop};
  padding-bottom: ${({ theme }) => theme.headerPaddingBottom};
  margin-bottom: ${({ theme }) => theme.headerMarginBottom};
`
const ThemeableHeaderStyles = themeable(HeaderStyles, composeTheme)
export { ThemeableHeaderStyles as HeaderStyles }

const CloseButtonStyles = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.borderPadding};
  right: ${({ theme }) => theme.borderPadding};
`
const ThemeableCloseButtonStyles = themeable(CloseButtonStyles, composeTheme)
export { ThemeableCloseButtonStyles as CloseButtonStyles }
