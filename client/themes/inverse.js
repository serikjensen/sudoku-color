import base from './base'

const { colors, shadows, ...properties } = base

const inverse = {
  ...properties,
  colors: {
    lightest: '#000000',
    light: '#dbdbdb',
    neutral: '#9B9B9B',
    dark: '#FFFFFF',
    primary: '#84BCFD',
    secondary: '#1DCC4A',
    focus: '#50E3C2',
    overlay: 'rgba(0, 0, 0, 0.8)',

    swatches: {
      1: '#BD0000',
      2: '#FF8100',
      3: '#72D27B',
      4: '#0E9F1B',
      5: '#840CC4',
      6: '#E35094',
      7: '#D19DFF',
      8: '#80B5F4',
      9: '#2F65EB'
    }
  },

  shadows: {
    resting: '0 0 0.5rem 0.025rem #323232',
    above: '0 0 1rem 0.025rem #323232',
    topmost: '0 0 1.5rem 0.025rem #323232',
    inner: 'inset 0 0 0.25rem 0.0125rem #323232'
  }
}

export default inverse
