export default Object.freeze({
  colors: {
    lightest: '#FFFFFF',
    neutral: '#9B9B9B',
    dark: '#4A4A4A',
    primary: '#4990E2',
    secondary: '#1DCC4A',
    focus: '#50E3C2',

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

  borders: {
    width: {
      small: '0.0625rem',
      medium: '0.125rem',
      large: '0.2rem'
    },
    style: {
      default: 'solid'
    },
    radii: {
      rectangular: '0.75rem',
      circular: '999rem'
    }
  },

  typography: {
    fontSize: {
      medium: '1rem',
      large: '1.25rem',
      xLarge: '1.75rem',
      xxLarge: '2.25rem'
    },
    fontWeight: {
      light: 300,
      normal: 400,
      bold: 500
    }
  },

  spacing: {
    // TODO: Offsets given in px to avoid weird spacing. Figure out how to bring these
    // values into rem/em
    focusOffset: '8px',
    highlightOffset: '2px',
    cellSize: '3.5rem',
    formFieldHeight: '2.5rem',

    padding: {
      xSmall: '0.25rem',
      small: '0.5rem',
      medium: '1rem',
      large: '2rem',
      xLarge: '3rem',
      xxLarge: '6rem'
    },

    margin: {
      xSmall: '0.25rem',
      small: '0.5rem',
      medium: '1rem',
      large: '2rem',
      xLarge: '3rem',
      xxLarge: '6rem'
    }
  },

  transitions: {
    duration: '0.25s'
  },

  shadows: {
    resting: '0 0 0.5rem 0.025rem #9B9B9B',
    above: '0 0 1rem 0.025rem #9B9B9B',
    topmost: '0 0 1.5rem 0.025rem #9B9B9B',
    inner: 'inset 0 0 0.25rem #9B9B9B'
  }
})