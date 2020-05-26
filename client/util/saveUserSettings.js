import { USER_SETTINGS_KEY } from '../constants/storageTypes'

export default function saveUserSettings ({
  difficultyPreference,
  themeKey,
  isLoadingUserSettings
}, storage = localStorage) {
  try {
    if (!isLoadingUserSettings) {
      const userSettingsData = JSON.stringify({
        difficultyPreference,
        themeKey
      })

      storage.setItem(USER_SETTINGS_KEY, userSettingsData)
    }
  } catch (err) {
    // TODO: Handle save to local storage error
  }
}
