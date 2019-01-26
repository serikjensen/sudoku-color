import styled from 'styled-components'

/* eslint-disable import/prefer-default-export */
export const CellStyles = styled.span`
  position: relative;
  background: white;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.width};
  height: ${({ theme }) => theme.height};
  border-bottom: ${({ theme, ...props }) => (
    props.coords.i === 8 ? 'none' : `${theme.borderWidthSmall} ${theme.borderStyle} ${theme.borderColor}`
  )};
  border-right: ${({ theme, ...props }) => (
    props.coords.j === 8 ? 'none' : `${theme.borderWidthSmall} ${theme.borderStyle} ${theme.borderColor}`
  )};
  border-left: ${({ theme, ...props }) => (
    props.coords.j === 3 || props.coords.j === 6
      ? `${theme.borderWidthMedium} ${theme.borderStyle} ${theme.borderColor}`
      : 'none'
  )};
  border-top: ${({ theme, ...props }) => (
    props.coords.i === 3 || props.coords.i === 6
      ? `${theme.borderWidthMedium} ${theme.borderStyle} ${theme.borderColor}`
      : 'none'
  )};
`
/* eslint-enable import/prefer-default-export */
