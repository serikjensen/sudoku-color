import styled from 'styled-components'

/* eslint-disable import/prefer-default-export */
export const FocusRingStyles = styled.span`
  display: ${({ focused }) => (focused ? 'inline-block' : 'none')};
  position: absolute;
  top: -${({ theme }) => theme.offset};
  left: -${({ theme }) => theme.offset};
  bottom: -${({ theme }) => theme.offset};
  right: -${({ theme }) => theme.offset};
  border-width: ${({ theme }) => theme.borderWidth};
  border-style: ${({ theme }) => theme.borderStyle};
  border-color: ${({ theme }) => theme.borderColor};
  border-radius: ${(props) => generateBorderRadius(props)};
  box-sizing: border-box;
`
/* eslint-enable import/prefer-default-export */

const generateBorderRadius = ({ theme, ...props }) => (
  props.shape === 'rectangular' ? theme.borderRadiusRectangular : theme.borderRadiusCircular
)
