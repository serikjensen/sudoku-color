import styled from 'styled-components'

export const TableStyles = styled.table`
  margin: 0.5rem;
`

/* eslint-disable import/prefer-default-export */
export const CellStyles = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.width};
  height: ${({ theme }) => theme.height};
`
