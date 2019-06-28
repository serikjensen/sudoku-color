import styled from 'styled-components'

export const EditFacadeStyles = styled.div`
  color: ${({ theme }) => theme.color};
  border-radius: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.background};
  font-size: ${({ theme }) => theme.fontSizeLarge};

  @media only screen and (max-width: 33.125em) {
    font-size: ${({ theme }) => theme.fontSizeMedium};
  }

  @media only screen and (max-width: 26.25em) {
    font-size: ${({ theme }) => theme.fontSizeSmall};
  }
`

export const EditLabelStyles = styled.div`
  display: ${props => (props.editing || props.focused ? 'inline-block' : 'none')};
  ${EditFacadeStyles}:hover & {
    display: inline-block;
  }
`
