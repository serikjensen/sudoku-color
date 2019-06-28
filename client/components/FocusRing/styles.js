import styled from 'styled-components'

/* eslint-disable import/prefer-default-export */
export const FocusRingStyles = styled.span`
  display: ${({ focused }) => (focused ? 'inline-block' : 'none')};
  position: absolute;
  top: -${({ theme }) => theme.offsetLarge};
  left: -${({ theme }) => theme.offsetLarge};
  bottom: -${({ theme }) => theme.offsetLarge};
  right: -${({ theme }) => theme.offsetLarge};
  border-width: ${({ theme }) => theme.borderWidth};
  border-style: ${({ theme }) => theme.borderStyle};
  border-color: ${({ theme }) => theme.borderColor};
  border-radius: ${(props) => generateBorderRadius(props)};
  box-sizing: border-box;

  @media only screen and (max-width: 33.125em) {
    top: -${({ theme }) => theme.offsetMedium};
    left: -${({ theme }) => theme.offsetMedium};
    bottom: -${({ theme }) => theme.offsetMedium};
    right: -${({ theme }) => theme.offsetMedium};
  }

  @media only screen and (max-width: 26.25em) {
    top: -${({ theme }) => theme.offsetSmall};
    left: -${({ theme }) => theme.offsetSmall};
    bottom: -${({ theme }) => theme.offsetSmall};
    right: -${({ theme }) => theme.offsetSmall};
  }
`
/* eslint-enable import/prefer-default-export */

const generateBorderRadius = ({ theme, ...props }) => (
  props.shape === 'rectangular' ? theme.borderRadiusRectangular : theme.borderRadiusCircular
)
