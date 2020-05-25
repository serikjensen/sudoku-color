import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from 'emotion-theming'
import { IconXLine, IconInfoBorderlessLine } from '@instructure/ui-icons'

import IconButton from '../IconButton'

import themeable from '../theming/themeable'
import composeTheme from './theme'
import composeStyles from './styles'

const Alert = ({
  children,
  shouldTransition,
  exitTransitionTimeout,
  transitionDuration,
  onFinishedExitTransition,
  onDismiss
}) => {
  const [shouldStartExitTransition, setShouldStartExitTransition] = useState(false)

  const theme = useTheme()
  const styles = composeStyles(theme, { transitionDuration }, { shouldStartExitTransition })

  if (shouldTransition) {
    useEffect(() => {
      const beginExitTransitionTimeout = setTimeout(() => {
        setShouldStartExitTransition(true)
      }, exitTransitionTimeout - transitionDuration)

      const finishedExitTransitionTimeout = setTimeout(() => {
        onFinishedExitTransition()
      }, exitTransitionTimeout)

      return () => {
        clearTimeout(beginExitTransitionTimeout)
        clearTimeout(finishedExitTransitionTimeout)
      }
    }, [])
  }

  const alertStyles = [
    styles.alert,
    styles.alertOpacity,
    (shouldStartExitTransition && shouldTransition) ? styles.transitionOut : styles.transitionIn
  ]

  return (
    <div css={styles.container}>
      <div css={alertStyles}>
        <div css={styles.icon}>
          <div css={styles.iconBackground}>
            <IconInfoBorderlessLine />
          </div>
        </div>
        <div css={styles.alertContent}>
          {children}
        </div>
        <div css={styles.alertClose}>
          <IconButton
            onClick={(event) => {
              onDismiss(event)
            }}
            size="small"
            label="Close"
            color="neutral"
            icon={() => <IconXLine />}
            data-sudoku-alert-close="true"
          />
        </div>
      </div>
    </div>
  )
}

Alert.propTypes = {
  children: PropTypes.node,
  shouldTransition: PropTypes.bool,
  exitTransitionTimeout: PropTypes.number,
  transitionDuration: PropTypes.number,
  onFinishedExitTransition: PropTypes.func,
  onDismiss: () => {}
}

Alert.defaultProps = {
  children: null,
  shouldTransition: true,
  exitTransitionTimeout: 5000,
  transitionDuration: 300,
  onFinishedExitTransition: () => {},
  onDismiss: () => {}
}

export default themeable(Alert, composeTheme)
