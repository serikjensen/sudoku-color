import styled from 'styled-components'

import { FocusRingStyles } from '../FocusRing/styles'

/* eslint-disable import/prefer-default-export */
export const ButtonStyles = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 2rem;
  margin: ${({ margin }) => margin};
  box-sizing: border-box;
  color: ${({ theme, color }) => theme[color].color};
  background: ${({ theme, color }) => theme[color].background};
  height: ${({ theme }) => theme.height};
  font-size: ${({ theme }) => theme.fontSize};
  font-weight: ${({ theme }) => theme.fontWeight};
  border-width: ${({ theme }) => theme.borderWidth};
  border-style: ${({ theme }) => theme.borderStyle};
  border-color: ${({ theme, color }) => theme[color].borderColor};
  border-radius: ${({ theme }) => theme.borderRadius};
  display: ${({ display }) => (display === 'block' ? 'block' : 'inline-block')};
  width: ${({ display }) => (display === 'block' && '100%')};
  transition: background ${({ theme }) => theme.transitionDuration};

  &:active {
    box-shadow: ${({ theme }) => theme.shadow};
  }

  &:hover {
    background: ${({ theme, color }) => theme[color].hoverBackground};
    color: ${({ theme, color }) => theme[color].hoverColor};
  }

  &:focus {
    outline: none;

    ${FocusRingStyles} {
      display: inline-block;
    }
  }
`
/* eslint-enable import/prefer-default-export */
