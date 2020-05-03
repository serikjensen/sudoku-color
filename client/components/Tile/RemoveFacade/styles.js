import styled from '@emotion/styled'

export const RemoveFacadeStyles = styled.div`
  width: 100%;
  height: 100%;
  border-style: solid;
  border-width: ${({ theme }) => theme.borderWidth};
  border-color: ${({ theme }) => theme.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    border-color: transparent;
    color: ${({ theme }) => theme.focusColor};
  }

  &:hover {
    border-color: ${({ theme }) => theme.hoverBorderColor};
    color: ${({ theme }) => theme.hoverColor};
  }
`
