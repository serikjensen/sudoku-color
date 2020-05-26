import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { setTheme } from '../../actions/userSettingsActions'
import AppThemeProvider from '../theming/AppThemeProvider'
import themes from '../../themes'

import RadioInputGroup from '../util/RadioInputGroup'
import RadioInput from '../util/RadioInput'

import Label from './Label'

const ThemePicker = ({ themeKey, setTheme: handleSetTheme }) => {
  const handleChange = (event, value) => {
    handleSetTheme(value)
  }

  const renderLabel = (label) => (
    <AppThemeProvider theme={themes[label.toLowerCase()]}>
      <Label label={label} />
    </AppThemeProvider>
  )

  return (
    <RadioInputGroup
      description="Set Theme"
      name="theme"
      value={themeKey}
      onChange={handleChange}
    >
      <RadioInput value="base" label={renderLabel('Base')} />
      <RadioInput value="inverse" label={renderLabel('Inverse')} />
    </RadioInputGroup>
  )
}

ThemePicker.propTypes = {
  themeKey: PropTypes.string,
  setTheme: PropTypes.func
}

ThemePicker.defaultProps = {
  themeKey: 'base',
  setTheme: () => {}
}

const mapStateToProps = state => state.userSettings

export { ThemePicker }
export default connect(mapStateToProps, { setTheme })(ThemePicker)
