import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { css, keyframes } from '@emotion/core'
import { useTheme } from 'emotion-theming'

import { PresentationContent } from '@instructure/ui-a11y-content'

import themeable from '../theming/themeable'
import composeTheme from './theme'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const tileCoords = [
  {
    cx: '27.5',
    cy: '27.5'
  },
  {
    cx: '27.5',
    cy: '87.5'
  },
  {
    cx: '27.5',
    cy: '147.5'
  },
  {
    cx: '87.5',
    cy: '27.5'
  },
  {
    cx: '87.5',
    cy: '87.5'
  },
  {
    cx: '87.5',
    cy: '147.5'
  },
  {
    cx: '147.5',
    cy: '27.5'
  },
  {
    cx: '147.5',
    cy: '87.5'
  },
  {
    cx: '147.5',
    cy: '147.5'
  }
]

const Logo = ({ shouldAnimate }) => {
  const { swatches, borderColor } = useTheme()
  const [animatedTiles, setAnimatedTiles] = useState([0, 1, 2])

  if (shouldAnimate) {
    useEffect(() => {
      const increment = value => (value + 1) % 9

      const interval = setInterval(() => {
        setAnimatedTiles((tiles) => [increment(tiles[0]), increment(tiles[1]), increment(tiles[2])])
      }, 250)

      return () => clearInterval(interval)
    }, [])
  }

  return (
    <PresentationContent>
      <svg width="100%" viewBox="0 0 175 175" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="175" height="175" fill="white" />
        <path d="M0 115H175V120H0V115Z" fill={borderColor} />
        <path d="M115 0H120V175H115V0Z" fill={borderColor} />
        <path d="M0 55H175V60H0V55Z" fill={borderColor} />
        <path d="M55 0H60V175H55V0Z" fill={borderColor} />
        {tileCoords.map(({ cx, cy }, i) => {
          const props = {
            key: `${cx}_${cy}`,
            cx,
            cy,
            r: '17.5',
            fill: swatches[(i + 1)]
          }

          if (shouldAnimate) {
            props.css = css`
              animation: ${animatedTiles.includes(i) ? fadeOut : fadeIn} 1s ease;
            `
          }

          return (
            <circle {...props} />
          )
        })}
      </svg>
    </PresentationContent>
  )
}

Logo.propTypes = {
  shouldAnimate: PropTypes.bool
}

Logo.defaultProps = {
  shouldAnimate: false
}

export default themeable(Logo, composeTheme)
