import base from './base'

const { colors, shadows, ...properties } = base

const purpley = {
  ...properties,
  colors: {
    lightest: '#F0C9FE',
    light: '#DA9DEF',
    neutral: '#A665BD',
    dark: '#5A1971',
    primary: '#5A1971',
    secondary: '#522D8F',
    focus: '#B30077',
    overlay: 'rgba(0, 0, 0, 0.8)',

    swatches: {
      1: '#C037D2',
      2: '#B41EC8',
      3: '#9C1AAD',
      4: '#9018A0',
      5: '#8C179B',
      6: '#5F1169',
      7: '#522D8F',
      8: '#000B6D',
      9: '#A3006D'
    }
  },

  shadows: {
    resting: '0 0 0.5rem 0.025rem #BD75D7',
    above: '0 0 1rem 0.025rem #BD75D7',
    topmost: '0 0 1.5rem 0.025rem #BD75D7',
    inner: 'inset 0 0 0.4rem 0.0125rem #BD75D7'
  }
}

export default purpley
