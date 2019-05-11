import styled from 'styled-components'

export const TileStyles = styled.button`
  position: absolute;
  width: ${({ theme }) => theme.width};
  height: ${({ theme }) => theme.height};
  font-size: ${({ theme }) => theme.fontSize};
  font-family: ${({ theme }) => theme.fontFamily};
  cursor: ${({ facade }) => (facade === 'presentation' ? 'default' : 'pointer')};
  padding: 0;
  border: none;

  &:focus {
    outline: none;
  }
`
