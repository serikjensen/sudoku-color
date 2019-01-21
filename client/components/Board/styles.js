import styled from 'styled-components'

export const TableStyles = styled.table`
  display: inline-block;
  padding: ${props => props.theme.cellSize}rem;
  border-collapse: collapse;
  box-shadow: ${props => props.theme.shadow};
`

export const TdStyles = styled.td`
  padding: 0;
`
