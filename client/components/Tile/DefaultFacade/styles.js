import styled from 'styled-components'

import { FocusRingStyles } from '../../FocusRing/styles'

export const DefaultFacadeStyles = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.color};
  background: ${props => generateTileColor(props) || props.theme.background};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};

  &:focus {
    outline: none;

    ${FocusRingStyles} {
      display: inline-block;
    }
  }
`

const generateTileColor = (props) => {
  const { value, theme } = props
  return theme.swatches[value < 0 ? value * -1 : value]
}
