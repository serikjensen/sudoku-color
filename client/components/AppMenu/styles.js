import styled from 'styled-components'

export const TrayStyles = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.borderPadding};
`

export const HeaderStyles = styled.div`
  margin-top: ${({ theme }) => theme.headerMarginTop};
  padding-bottom: ${({ theme }) => theme.headerPaddingBottom};
  margin-bottom: ${({ theme }) => theme.headerMarginBottom};
`

export const CloseButtonStyles = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.borderPadding};
  right: ${({ theme }) => theme.borderPadding};
`
