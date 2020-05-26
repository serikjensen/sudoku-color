import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from 'emotion-theming'

import { ScreenReaderContent, PresentationContent } from '@instructure/ui-a11y-content'

import BoardLogo from '../../BoardLogo'

import themeable from '../../theming/themeable'
import composeTheme from './theme'
import composeStyles from './styles'

const Label = ({ label }) => {
  const theme = useTheme()
  const styles = composeStyles(theme)

  return (
    <>
      <ScreenReaderContent>{label}</ScreenReaderContent>
      <PresentationContent>
        <div css={styles.label}>
          <div css={styles.logo}>
            <BoardLogo />
          </div>
          <div css={styles.content}>
            {label}
          </div>
        </div>
      </PresentationContent>
    </>
  )
}

Label.propTypes = {
  label: PropTypes.node
}

Label.defaultProps = {
  label: null
}

const ThemedLabel = themeable(Label, composeTheme)

export default ThemedLabel
