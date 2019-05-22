import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import InstUIPopover, { PopoverTrigger, PopoverContent } from '@instructure/ui-overlays/lib/Popover'
import { ApplyTheme } from '@instructure/ui-themeable'
import { View } from '@instructure/ui-layout'

import AppThemeProvider from '../../theming/AppThemeProvider'
import AppThemeContext from '../../theming/AppThemeContext'

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
      <ApplyTheme theme={{
          [View.theme]: {
            borderRadiusMedium: '1rem',
            shadowResting: (appTheme.shadows || {}).resting
          }
        }}
      >
        <InstUIPopover {...props}>
          <PopoverTrigger>
            {trigger}
          </PopoverTrigger>
          <PopoverContent>
            <AppThemeProvider theme={appTheme}>
              {content}
            </AppThemeProvider>
          </PopoverContent>
        </InstUIPopover>
      </ApplyTheme>
    )
  }
}

export default Popover
