import React from 'react'
import ReactDOM from 'react-dom'

import { Dialog } from '@instructure/ui-dialog'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'

import { getLiveRegionElement, getVisibleAlertsElement } from './getElements'
import Alert from '../components/Alert'
import themes from '../themes'
import AppThemeProvider from '../components/theming/AppThemeProvider'

export default function ({ children, duration, politeness, themeKey = 'base' } = {}) {
  const liveRegionElement = getLiveRegionElement()
  const visibleAlertsElement = getVisibleAlertsElement()

  const screenReaderId = 'screenreader-alert'

  const handleCleanup = () => {
    liveRegionElement.removeAttribute('aria-live')
    liveRegionElement.removeAttribute('aria-relevant')
    liveRegionElement.removeAttribute('aria-atomic')

    const screenReaderAlertElement = document.getElementById(screenReaderId)

    if (screenReaderAlertElement) {
      screenReaderAlertElement.parentNode.removeChild(screenReaderAlertElement)
    }

    ReactDOM.unmountComponentAtNode(visibleAlertsElement)
  }

  // politeness one of either 'polite' or 'assertive'
  liveRegionElement.setAttribute('aria-live', politeness || 'polite')
  liveRegionElement.setAttribute('aria-relevant', 'additions text')
  liveRegionElement.setAttribute('aria-atomic', false)

  const screenReaderAlertElement = document.createElement('div')
  screenReaderAlertElement.setAttribute('id', screenReaderId)

  const visibleAlert = (
    <AppThemeProvider theme={themes[themeKey]}>
      <Dialog
        shouldFocusOnOpen={false}
        shouldCloseOnDocumentClick
        liveRegion={() => liveRegionElement}
        onDismiss={handleCleanup}
        open
      >
        <Alert
          shouldTransition
          exitTransitionTimeout={duration}
          onDismiss={handleCleanup}
          onFinishedExitTransition={handleCleanup}
        >
          {children}
        </Alert>
      </Dialog>
    </AppThemeProvider>
  )

  ReactDOM.render(
    visibleAlert,
    visibleAlertsElement
  )

  const screenReaderAlert = (
    <ScreenReaderContent>
      {children}
    </ScreenReaderContent>
  )

  ReactDOM.render(
    screenReaderAlert,
    screenReaderAlertElement
  )

  liveRegionElement.appendChild(screenReaderAlertElement)

  return handleCleanup
}
