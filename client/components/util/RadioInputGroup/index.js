/* eslint-disable react/prop-types */
import React from 'react'
import { RadioInputGroup as InstUIRadioInputGroup, RadioInput } from '@instructure/ui-radio-input'
import { FormFieldLabel } from '@instructure/ui-form-field'

import { ApplyTheme } from '@instructure/ui-themeable'
import themeable from '../../theming/themeable'

import composeTheme from './theme'

const RadioInputGroup = ({ theme, ...props }) => (
  <ApplyTheme theme={{
    [FormFieldLabel.theme]: {
      color: theme.labelColor
    },
    [RadioInput.theme]: {
      labelColor: theme.labelColor,
      focusBorderColor: theme.focusColor,
      borderColor: theme.labelColor,
      hoverBorderColor: theme.inputColor
    }
  }}
  >
    <InstUIRadioInputGroup {...props} />
  </ApplyTheme>
)

export default themeable(RadioInputGroup, composeTheme)
