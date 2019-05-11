import styled from 'styled-components'

export const TileHighlightStyles = styled.span`
  display: inline-block;
  position: absolute;
  top: ${({ theme }) => theme.offset};
  left: ${({ theme }) => theme.offset};
  bottom: ${({ theme }) => theme.offset};
  right: ${({ theme }) => theme.offset};
  border-radius: 50%;
  border-style: solid;
  border-width: ${({ theme }) => theme.width};
  border-color: ${({ theme }) => theme.color};
`
