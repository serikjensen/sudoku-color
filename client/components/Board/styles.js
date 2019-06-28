import styled from 'styled-components'

export const TableStyles = styled.table`
  display: inline-block;
  padding: ${({ theme }) => theme.paddingLarge};
  border-collapse: collapse;
  box-shadow: ${({ theme }) => theme.shadow};

  @media only screen and (max-width: 39.375em) {
    padding: ${({ theme }) => theme.paddingSmall} 0;
    box-shadow: none;
  }
`

export const TdStyles = styled.td`
  padding: 0;
`
