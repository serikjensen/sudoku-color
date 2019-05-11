import styled from 'styled-components'

export const RemoveFacadeStyles = styled.div`
  width: 100%;
  height: 100%;
  border-style: solid;
  border-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};

  &:focus {
    border-color: transparent;
    color: ${({ theme }) => theme.focusColor};
  }

  &:hover {
    border-color: ${({ theme }) => theme.hoverBorderColor};
    color: ${({ theme }) => theme.hoverColor};
  }
`
