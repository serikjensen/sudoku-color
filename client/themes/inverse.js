import base from './base'

const { colors, shadows, ...properties } = base

const inverse = {
  ...properties,
  colors: {
    lightest: '#000000',
    light: '#dbdbdb',
    neutral: '#9B9B9B',
    dark: '#FFFFFF',
    primary: '#6189EF',
    secondary: '#1DCC4A',
    focus: '#50E3C2',
    overlay: 'rgba(0, 0, 0, 0.8)',

    swatches: {
      1: '#EB0000',
      2: '#FF8100',
      3: '#72D27B',
      4: '#0E9F1B',
      5: '#B036F2',
      6: '#E35094',
      7: '#D9ADFF',
      8: '#A0C8F8',
      9: '#4575ED'
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
