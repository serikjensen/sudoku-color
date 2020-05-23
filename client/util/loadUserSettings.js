import { USER_SETTINGS_KEY } from '../constants/storageTypes'
import { REALLY_EASY } from '../constants/difficultyTypes'

export default function loadUserSettings (onLoad, storage = localStorage) {
  let difficultyPreference = null

  try {
    const savedUserSettingsData = storage.getItem(USER_SETTINGS_KEY)

    if (savedUserSettingsData) {
      const savedUserSettings = JSON.parse(savedUserSettingsData)

      difficultyPreference = savedUserSettings.difficultyPreference
    }
  } catch (err) {
    difficultyPreference = REALLY_EASY
  }

  onLoad({
    difficultyPreference: difficultyPreference || REALLY_EASY
  })
}
