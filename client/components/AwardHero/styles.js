import { css } from '@emotion/core'

export default (theme, state) => ({
  heading: css`
    color: ${theme.color};
    text-align: center;
  `,

  imageContainer: css`
    display: flex;
    justify-content: center;
    height: 10rem;
  `,

  image: css`
    display: ${state.isImageLoaded ? 'initial' : 'none'};
  `,

  description: css`
    color: ${theme.color};
    text-align: center;
    margin: 1.5rem 0.25rem;
  `
})
