import styled from 'styled-components'

export const TrayStyles = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.borderPadding};
`

export const HeaderStyles = styled.div`
  padding-top: ${({ theme }) => theme.headerPadding};
`

export const CloseButtonStyles = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.borderPadding};
  right: ${({ theme }) => theme.borderPadding};
`
