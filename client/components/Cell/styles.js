import styled from 'styled-components'

/* eslint-disable import/prefer-default-export */
export const CellStyles = styled.span`
  position: relative;
  background: white;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.theme.cellSize}rem;
  height: ${props => props.theme.cellSize}rem;
  border-bottom: ${props => (
    props.coords.i === 8 ? 'none' : `${props.theme.borderWidthSmall} solid ${props.theme.colorNeutral}`
  )};
  border-right: ${props => (
    props.coords.j === 8 ? 'none' : `${props.theme.borderWidthSmall} solid ${props.theme.colorNeutral}`
  )};
  border-left: ${props => (
    props.coords.j === 3 || props.coords.j === 6
      ? `${props.theme.borderWidthMedium} solid ${props.theme.colorNeutral}`
      : 'none'
  )};
  border-top: ${props => (
    props.coords.i === 3 || props.coords.i === 6
      ? `${props.theme.borderWidthMedium} solid ${props.theme.colorNeutral}`
      : 'none'
  )};
`
/* eslint-enable import/prefer-default-export */
