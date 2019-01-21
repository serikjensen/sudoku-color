import styled from 'styled-components'

export const DefaultFacadeStyles = styled.button`
  position: absolute;
  width: ${props => props.theme.cellSize - (props.theme.tileFocusOffset * 2)}rem;
  height: ${props => props.theme.cellSize - (props.theme.tileFocusOffset * 2)}rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colorLightest};
  background: ${props => generateTileColor(props)};
  font-size: ${props => props.theme.tileFontSize}rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    top: -${props => props.theme.tileFocusOffset}rem;
    left: -${props => props.theme.tileFocusOffset}rem;
    bottom: -${props => props.theme.tileFocusOffset}rem;
    right: -${props => props.theme.tileFocusOffset}rem;
    border: ${props => props.theme.tileBorderWidth}rem solid ${props => props.theme.colorFocus};
    border-radius: ${props => props.theme.tileFocusBorderRadius}rem;
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
  color: ${props => props.theme.colorFocus};
  border-radius: 0;
`

export const RemoveFacadeStyles = styled(DefaultFacadeStyles)`
  border-style: solid;
  border-width: ${props => props.theme.tileBorderWidth};
  border-color: ${props => props.theme.colorNeutral};
  color: ${props => props.theme.colorNeutral};

  &:focus {
    border-color: transparent;
    color: ${props => props.theme.colorFocus};
  }

  &:hover {
    border-color: ${props => props.theme.colorFocus};
    color: ${props => props.theme.colorFocus};
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
  border-color: ${props => props.theme.colorLightest};
`

const generateTileColor = (props) => {
  const { label, theme } = props

  const map = {
    1: 'colorOne',
    2: 'colorTwo',
    3: 'colorThree',
    4: 'colorFour',
    5: 'colorFive',
    6: 'colorSix',
    7: 'colorSeven',
    8: 'colorEight',
    9: 'colorNine'
  }

  return theme[map[label]]
}
