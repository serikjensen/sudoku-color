import React from 'react'
import { useTheme } from 'emotion-theming'

import themeable from '../theming/themeable'

import composeTheme from './theme'
import composeStyles from './styles'

const IncorrectHero = () => {
  const theme = useTheme()
  const styles = composeStyles(theme)

  return (
    <>
      <h2 css={styles.heading}>Whoops!</h2>
      <p css={styles.description}>Looks like this puzzle isn&apos;t quite correct.</p>
    </>
  )
}

const ThemedIncorrectHero = themeable(IncorrectHero, composeTheme)

export default ThemedIncorrectHero
