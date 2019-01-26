import styled from 'styled-components'

export const TableStyles = styled.table`
  display: inline-block;
  padding: ${({ theme }) => theme.padding};
  border-collapse: collapse;
  box-shadow: ${({ theme }) => theme.shadow};
`

export const TdStyles = styled.td`
  padding: 0;
`
