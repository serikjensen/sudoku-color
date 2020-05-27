import base from './base'

const { colors, shadows, ...properties } = base

const retro = {
  ...properties,
  colors: {
    lightest: '#4A66CA',
    light: '#8C9ADE',
    neutral: '#FFFFFF',
    dark: '#FFFFFF',
    primary: '#E8EDFC',
    secondary: '#92DD9A',
    focus: '#FDF769',
    overlay: 'rgba(0, 0, 0, 0.8)',

    swatches: {
      1: '#FEFFB6',
      2: '#FFB870',
      3: '#92DD9A',
      4: '#B8FFEE',
      5: '#E0BDFF',
      6: '#FFB8B8',
      7: '#FFBEE5',
      8: '#A9CDF9',
      9: '#F6FEFF'
    }
  },

  shadows: {
    resting: '0 0 0.5rem 0.025rem #0427A5',
    above: '0 0 1rem 0.025rem #0427A5',
    topmost: '0 0 1.5rem 0.025rem #0427A5',
    inner: 'inset 0 0 0.4rem 0.0125rem #0427A5'
  }
}

export default retro
