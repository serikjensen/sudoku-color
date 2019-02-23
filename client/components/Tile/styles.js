import styled from 'styled-components'

import { FocusRingStyles } from '../FocusRing/styles'

export const DefaultFacadeStyles = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.width};
  height: ${({ theme }) => theme.height};
  color: ${({ theme }) => theme.defaultColor};
  background: ${props => generateTileColor(props) || props.theme.defaultBackground};
  font-size: ${({ theme }) => theme.fontSize};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;

  &:focus {
    outline: none;

    ${FocusRingStyles} {
      display: inline-block;
    }
  }
`

export const PresentationFacadeStyles = styled(DefaultFacadeStyles)`
  cursor: default;
`

export const EditFacadeStyles = styled(DefaultFacadeStyles)`
  color: ${({ theme }) => theme.editColor};
  border-radius: 0;
`

export const RemoveFacadeStyles = styled(DefaultFacadeStyles)`
  border-style: solid;
  border-width: ${({ theme }) => theme.removeBorderWidth};
  border-color: ${({ theme }) => theme.removeBorderColor};
  color: ${({ theme }) => theme.removeColor};

  &:focus {
    border-color: transparent;
    color: ${({ theme }) => theme.removeFocusColor};
  }

  &:hover {
    border-color: ${({ theme }) => theme.removeHoverBorderColor};
    color: ${({ theme }) => theme.removeHoverColor};
  }
`

export const EditLabelStyles = styled.span`
  display: ${props => (props.editing ? 'inline-block' : 'none')};

  ${EditFacadeStyles}:hover &,
  ${EditFacadeStyles}:focus & {
    display: inline-block;
  }
`

export const HighlightStyles = styled.span`
  display: inline-block;
  position: absolute;
  top: ${({ theme }) => theme.highlightOffset};
  left: ${({ theme }) => theme.highlightOffset};
  bottom: ${({ theme }) => theme.highlightOffset};
  right: ${({ theme }) => theme.highlightOffset};
  border-radius: 50%;
  border-style: solid;
  border-width: ${({ theme }) => theme.highlightWidth};
  border-color: ${({ theme }) => theme.highlightColor};
`

const generateTileColor = (props) => {
  const { value, theme } = props
  return theme.swatches[value < 0 ? value * -1 : value]
}
