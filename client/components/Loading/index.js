import React from 'react'
import { css } from '@emotion/core'

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

export default () => (
  <div css={rootStyles}>
    <div>
      <div css={logoStyles}>
        <Logo shouldAnimate />
      </div>
      <div css={loadingStyles}>Loading...</div>
    </div>
  </div>
)
