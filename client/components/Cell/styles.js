import styled from 'styled-components'

/* eslint-disable import/prefer-default-export */
export const CellStyles = styled.span`
  background: white;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-bottom: ${props => (props.coords.i === 8 ? 'none' : '1px solid black')};
  border-right: ${props => (props.coords.j === 8 ? 'none' : '1px solid black')};
  border-left: ${props => (props.coords.j === 3 || props.coords.j === 6 ? '1px solid black' : 'none')};
  border-top: ${props => (props.coords.i === 3 || props.coords.i === 6 ? '1px solid black' : 'none')};
`
/* eslint-enable import/prefer-default-export */
