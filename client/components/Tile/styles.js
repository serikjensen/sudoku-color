import styled from 'styled-components'

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

  &:before {
    content: "";
    position: absolute;
    top: -${({ theme }) => theme.focusOffset};
    left: -${({ theme }) => theme.focusOffset};
    bottom: -${({ theme }) => theme.focusOffset};
    right: -${({ theme }) => theme.focusOffset};
    border-width: ${({ theme }) => theme.focusBorderWidth};
    border-style: ${({ theme }) => theme.focusBorderStyle};
    border-color: ${({ theme }) => theme.focusBorderColor};
    border-radius: ${({ theme }) => theme.focusBorderRadius};
    opacity: 0;
  }

  &:focus {
    outline: none;

    &:before {
      opacity: 1;
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
  top: 0.15rem;
  left: 0.15rem;
  bottom: 0.15rem;
  right: 0.15rem;
  border-radius: 50%;
  border-style: solid;
  border-width: 0.15rem;
  border-color: ${({ theme }) => theme.highlightColor};
`

const generateTileColor = (props) => {
  const { label, theme } = props
  return theme.swatches[label]
}
