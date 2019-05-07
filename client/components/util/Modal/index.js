import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Modal as InstUIModal } from '@instructure/ui-overlays'

import AppThemeProvider from '../../theming/AppThemeProvider'
import AppThemeContext from '../../theming/AppThemeContext'

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
      <InstUIModal {...props}>
        <InstUIModal.Body>
          <AppThemeProvider theme={appTheme}>
            {children}
          </AppThemeProvider>
        </InstUIModal.Body>
      </InstUIModal>
    )
  }
}

export default Modal
