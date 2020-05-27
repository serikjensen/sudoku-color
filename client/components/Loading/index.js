import React from 'react'
import PropTypes from 'prop-types'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { useTheme } from 'emotion-theming'
import themeable from '../theming/themeable'

import BoardLogo from '../BoardLogo'

import composeTheme from './theme'
import composeStyles from './styles'

const renderLoadingText = ({ withVisibleLoadingText, styles }) => {
  let loadingText = <div css={styles.loading}>Loading...</div>

  if (!withVisibleLoadingText) {
    loadingText = <ScreenReaderContent>{loadingText}</ScreenReaderContent>
  }

  return loadingText
}

const Loading = ({ withVisibleLoadingText }) => {
  const theme = useTheme()
  const styles = composeStyles(theme)

  return (
    <div css={styles.root}>
      <div>
        <div css={styles.logo}>
          <BoardLogo shouldAnimate />
        </div>
        {renderLoadingText({ withVisibleLoadingText, styles })}
      </div>
    </div>
  )
}

Loading.propTypes = {
  withVisibleLoadingText: PropTypes.bool
}

Loading.defaultProps = {
  withVisibleLoadingText: true
}

export default themeable(Loading, composeTheme)
