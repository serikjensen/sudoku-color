import styled from '@emotion/styled'

export const TileStyles = styled.button`
  position: absolute;
  width: ${({ theme }) => theme.widthLarge};
  height: ${({ theme }) => theme.heightLarge};
  font-size: ${({ theme }) => theme.fontSize};
  font-family: ${({ theme }) => theme.fontFamily};
  background: ${({ theme }) => theme.background};
  cursor: ${({ facade }) => (facade === 'presentation' ? 'default' : 'pointer')};
  padding: 0;
  line-height: 0;
  border: none;

  &:focus {
    outline: none;
  }

  @media only screen and (max-width: 33.125em) {
    line-height: 0.75;
    font-size: ${({ theme }) => theme.fontSizeSmall};
    width: ${({ theme }) => theme.widthMedium};
    height: ${({ theme }) => theme.heightMedium};
  }

  @media only screen and (max-width: 26.25em) {
    font-size: ${({ theme }) => theme.fontSizeSmall};
    width: ${({ theme }) => theme.widthSmall};
    height: ${({ theme }) => theme.heightSmall};
  }
`
