import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { connect } from 'react-redux'

import {
  REALLY_EASY,
  EASY,
  MEDIUM,
  HARD
} from '../../constants/difficultyTypes'

const heading = css`
  text-align: center;
`

const image = css`
  display: flex;
  justify-content: center;
  max-height: 14rem;
`

const description = css`
  text-align: center;
  margin: 1.5rem 0.25rem;
`

const getMessage = (difficulty) => {
  const messages = {
    [REALLY_EASY]: [
      'You won the participation ribbon! Embroidered with the traditional Sudoku symbol, it\'s',
      'abundance makes it the ideal award for the multitudes that solve puzzles as easy as these.'
    ].join(' '),
    [EASY]: [
      'You won the bronze medal! Engraved with the traditional Sudoku symbol, it is a tribute',
      'of advancement widely available to the many who can solve puzzles at this level.'
    ].join(' '),
    [MEDIUM]: [
      'You won the mysterious blue rupee! The traditional Sudoku symbol is chiseled on the',
      'front. It radiates with a mysterious shine, a somewhat scarce reward for those who',
      'solve puzzles as difficult as these.'
    ].join(' '),
    [HARD]: [
      'You won the crown! A fitting tribute to Sudoku royalty.'
    ].join(' ')
  }

  return messages[difficulty]
}

const getSource = (difficulty) => {
  const sources = {
    [REALLY_EASY]: 'really-easy-award.svg',
    [EASY]: 'easy-award.svg',
    [MEDIUM]: 'medium-award.svg',
    [HARD]: 'hard-award.svg'
  }

  return sources[difficulty]
}

const getAltText = (difficulty) => {
  const altTexts = {
    [REALLY_EASY]: 'A beautiful, purple, participation ribbon awarded to you',
    [EASY]: 'A bronze, dignified, medal awarded to you',
    [MEDIUM]: 'A large, blue, majestic rupee awarded to you',
    [HARD]: 'A glimmering, enormous crown marking you as Sudoku royalty'
  }

  return altTexts[difficulty]
}

const AwardHero = ({ difficulty }) => (
  <>
    <h2 css={heading}>Congratulations!</h2>
    <div css={image}>
      <img
        src={getSource(difficulty)}
        alt={getAltText(difficulty)}
      />
    </div>
    <p css={description}>
      {getMessage(difficulty)}
    </p>
  </>
)

AwardHero.propTypes = {
  difficulty: PropTypes.oneOf([
    REALLY_EASY,
    EASY,
    MEDIUM,
    HARD
  ])
}

AwardHero.defaultProps = {
  difficulty: REALLY_EASY
}

const mapStateToProps = (state) => state.puzzle

export { AwardHero }
export default connect(mapStateToProps)(AwardHero)
