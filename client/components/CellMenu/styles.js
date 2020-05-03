import styled from '@emotion/styled'

export const TableStyles = styled.table`
  margin: 0.5rem;
`

/* eslint-disable import/prefer-default-export */
export const CellStyles = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.widthLarge};
  height: ${({ theme }) => theme.heightLarge};

  @media only screen and (max-width: 33.125em) {
    width: ${({ theme }) => theme.widthMedium};
    height: ${({ theme }) => theme.heightMedium};
  }

  @media only screen and (max-width: 26.25em) {
    width: ${({ theme }) => theme.widthSmall};
    height: ${({ theme }) => theme.heightSmall};
  }
`
