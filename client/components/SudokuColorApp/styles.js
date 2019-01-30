import styled, { createGlobalStyle } from 'styled-components'

/* eslint-disable import/prefer-default-export */
export const GlobalStyles = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Lato:100,200,300,400,500,600,700&subset=latin-ext');
    font-family: 'Lato', sans-serif;
    font-size: 16px;
  }
`
/* eslint-enable import/prefer-default-export */

export const AppContentStyles = styled.div`
  display: flex;
  justify-content: center;
`

export const AppHeaderStyles = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0;
`

export const AppBodyStyles = styled.div`
  display: flex;
  justify-content: center;
`
