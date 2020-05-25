import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Popover as InstUIPopover } from '@instructure/ui-popover'
import { ApplyTheme } from '@instructure/ui-themeable'
import { View } from '@instructure/ui-view'

import AppThemeProvider from '../../theming/AppThemeProvider'
import AppThemeContext from '../../theming/AppThemeContext'

import { getLiveRegionElement } from '../../../util/getElements'

class Popover extends PureComponent {
  static propTypes = {
    trigger: PropTypes.node,
    content: PropTypes.node
  }

  static defaultProps = {
    trigger: null,
    content: null
  }

  static contextType = AppThemeContext

  render () {
    const {
      trigger,
      content,
      ...props
    } = this.props

    const appTheme = this.context

    // Rendering within the Popover is somehow interfering with the context. We recreate the
    // app theme context within the Popover content
    return (
      <ApplyTheme theme={
        { [View.theme]: {
          borderRadiusMedium: '1rem',
          shadowResting: (appTheme.shadows || {}).resting
        } }}
      >
        <InstUIPopover
          {...props}
          liveRegion={() => getLiveRegionElement()}
          renderTrigger={trigger}
        >
          <AppThemeProvider theme={appTheme}>
            {content}
          </AppThemeProvider>
        </InstUIPopover>
      </ApplyTheme>
    )
  }
}

export default Popover
