import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'

import Logo from '../Logo'

const rootStyles = css`
  display: flex;
  align-items: center;
`

const logoStyles = css`
  width: 4rem;
  margin-bottom: 0.25rem;
`

const loadingStyles = css`
  text-align: center;
  font-weight: bold;
`

const renderLoadingText = ({ withVisibleLoadingText }) => {
  let loadingText = <div css={loadingStyles}>Loading...</div>

  if (!withVisibleLoadingText) {
    loadingText = <ScreenReaderContent>{loadingText}</ScreenReaderContent>
  }

  return loadingText
}

const Loading = ({ withVisibleLoadingText }) => (
  <div css={rootStyles}>
    <div>
      <div css={logoStyles}>
        <Logo shouldAnimate />
      </div>
      {renderLoadingText({ withVisibleLoadingText })}
    </div>
  </div>
)

Loading.propTypes = {
  withVisibleLoadingText: PropTypes.bool
}

Loading.defaultProps = {
  withVisibleLoadingText: true
}


export default Loading
