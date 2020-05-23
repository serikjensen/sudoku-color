import React from 'react'
import { css } from '@emotion/core'

const heading = css`
  text-align: center;
`

const description = css`
  text-align: center;
  margin: 1.5rem 0.25rem;
`

export default () => (
  <>
    <h2 css={heading}>Whoops!</h2>
    <p css={description}>Looks like this puzzle isn&apos;t quite correct.</p>
  </>
)
