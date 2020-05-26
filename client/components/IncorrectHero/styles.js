import { css } from '@emotion/core'

export default (theme) => ({
  heading: css`
    color: ${theme.color};
    text-align: center;
  `,

  description: css`
    color: ${theme.color};
    text-align: center;
    margin: 1.5rem 0.25rem;
  `
})
