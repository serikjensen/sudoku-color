import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Modal as InstUIModal } from '@instructure/ui-modal'
import { Mask as InstUIMask } from '@instructure/ui-overlays'
import { ApplyTheme } from '@instructure/ui-themeable'

import AppThemeProvider from '../../theming/AppThemeProvider'
import AppThemeContext from '../../theming/AppThemeContext'

import { getLiveRegionElement } from '../../../util/getElements'

class Modal extends PureComponent {
  static propTypes = {
    children: PropTypes.node
  }

  static defaultProps = {
    children: null
  }

  static contextType = AppThemeContext

  render () {
    const {
      children,
      ...props
    } = this.props

    const appTheme = this.context

    // Rendering within the Popover is somehow interfering with the context. We recreate the
    // app theme context within the Popover content
    return (
      <ApplyTheme theme={
        {
          [InstUIModal.Body.theme]: {
            inverseBackground: (appTheme.colors || {}).lightest
          },
          [InstUIMask.theme]: {
            background: (appTheme.colors || {}).overlay
          }
        }}
      >
        <InstUIModal variant="inverse" liveRegion={() => getLiveRegionElement()} {...props}>
          <InstUIModal.Body>
            <AppThemeProvider theme={appTheme}>
              {children}
            </AppThemeProvider>
          </InstUIModal.Body>
        </InstUIModal>
      </ApplyTheme>
    )
  }
}

export default Modal
