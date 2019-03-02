import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import InstUIModal, { ModalBody } from '@instructure/ui-overlays/lib/components/Modal'

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
        <ModalBody>
          <AppThemeProvider theme={appTheme}>
            {children}
          </AppThemeProvider>
        </ModalBody>
      </InstUIModal>
    )
  }
}

export default Modal
