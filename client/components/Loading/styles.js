import { css } from '@emotion/core'

export default (theme) => ({
  root: css`
    display: flex;
    align-items: center;
  `,

  logo: css`
    width: 4rem;
    margin-bottom: 0.25rem;
  `,

  loading: css`
    text-align: center;
    font-weight: bold;
    color: ${theme.color};
  `
})
