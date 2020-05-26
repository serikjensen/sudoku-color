import styled from '@emotion/styled'
import composeTheme from './theme'
import themeable from '../theming/themeable'

const TrayStyles = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.borderPadding};
  background: ${({ theme }) => theme.background};
  border-right: ${({ theme }) => theme.borderWidth} solid ${({ theme }) => theme.borderColor};
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

const SettingsStyles = styled.h3`
  font-size: ${({ theme }) => theme.settingsFontSize};
  color: ${({ theme }) => theme.settingsColor};
  border-bottom: 1px solid ${({ theme }) => theme.settingsRuleColor};
  padding: 1rem 0;
  margin-top: 2rem;
`

const ThemeableSettingsStyles = themeable(SettingsStyles, composeTheme)
export { ThemeableSettingsStyles as SettingsStyles }

export const SettingsFieldStyles = styled.div`
  margin-bottom: 2.5rem;
`
