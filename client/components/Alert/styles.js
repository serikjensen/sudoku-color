import { css, keyframes } from '@emotion/core'

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
`

export default (theme, props, state) => ({
  container: css`
    top: 0;
    left: 0;
    right: 0;
    position: fixed;
    margin: 2rem;
    display: flex;
    justify-content: center;
    pointer-events: none;
    z-index: 10000;
  `,
  alert: css`
    border: 1px solid black;
    background: ${theme.background};
    border: ${theme.borderWidth} ${theme.borderStyle} ${theme.borderColor};
    border-radius: ${theme.borderRadius};
    box-shadow: ${theme.shadow};
    pointer-events: auto;
    display: flex;
  `,
  alertContent: css`
    display: flex;
    align-items: center;
    color: ${theme.color};
    margin: 0.75rem 0;
  `,
  alertOpacity: css`
    opacity: ${state.shouldStartExitTransition ? 0 : 1};
  `,
  alertClose: css`
    display: flex;
    align-items: center;
    padding-right: 0.25rem;
  `,
  transitionIn: css`
    animation: ${fadeIn} ${props.transitionDuration}ms ease;
  `,
  transitionOut: css`
    animation: ${fadeOut} ${props.transitionDuration}ms ease;
  `,
  icon: css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem;
    color: ${theme.iconColor};
  `,
  iconBackground: css`
    background: ${theme.iconBackground};
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${theme.iconFontSize}; 
  `
})
