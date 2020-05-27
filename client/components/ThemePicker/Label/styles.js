import { css } from '@emotion/core'

export default (theme) => ({
  label: css`
    border: ${theme.borderWidth} solid ${theme.borderColor};
    border-radius: ${theme.borderRadius};
    background: ${theme.background};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    width: 12rem;
    cursor: pointer;
  `,

  logo: css`
    width: 4rem;
    padding: 0.5rem;
  `,

  content: css`
    font-weight: bold;
    color: ${theme.color};
  `
})
