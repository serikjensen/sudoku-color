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

  const renderLabel = (key, label) => (
    <AppThemeProvider theme={themes[key]}>
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
      <RadioInput value="base" label={renderLabel('base', 'Classic')} />
      <RadioInput value="inverse" label={renderLabel('inverse', 'Dark')} />
      <RadioInput value="blackAndWhite" label={renderLabel('blackAndWhite', 'Grayscale')} />
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
