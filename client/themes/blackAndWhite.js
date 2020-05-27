import base from './base'

const { colors, shadows, ...properties } = base

const inverse = {
  ...properties,
  colors: {
    lightest: '#313131',
    light: '#dbdbdb',
    neutral: '#9B9B9B',
    dark: '#C9C9C9',
    primary: '#C9C9C9',
    secondary: '#C9C9C9',
    focus: '#C9C9C9',
    overlay: 'rgba(0, 0, 0, 0.8)',

    swatches: {
      1: '#FFFFFF',
      2: '#EBEBEB',
      3: '#E3E3E3',
      4: '#D4D4D4',
      5: '#CFCFCF',
      6: '#BABABA',
      7: '#C4C4C4',
      8: '#A6A6A6',
      9: '#999999'
    }
  },

  shadows: {
    resting: '0 0 0.5rem 0.025rem #323232',
    above: '0 0 0.25rem 0.0125rem #9B9B9B',
    topmost: '0 0 1.5rem 0.025rem #323232',
    inner: 'none'
  }
}

export default inverse
