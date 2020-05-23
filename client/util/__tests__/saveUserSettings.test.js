import { expect } from '@instructure/ui-test-utils'
import { USER_SETTINGS_KEY } from '../../constants/storageTypes'
import saveUserSettings from '../saveUserSettings'
import { REALLY_EASY, MEDIUM } from '../../constants/difficultyTypes'

describe('saveUserSettings', () => {
  it('should save difficulty to storage when user settings are not loading', () => {
    const savedData = {}

    const storage = {
      setItem: (key, data) => {
        savedData[key] = data
      }
    }

    saveUserSettings({
      difficultyPreference: MEDIUM
    }, storage)

    expect(savedData[USER_SETTINGS_KEY]).to.equal(JSON.stringify({
      difficultyPreference: MEDIUM
    }))
  })

  it('should not save puzzle to storage when it has only null values', () => {
    const savedData = {}

    const storage = {
      setItem: (key, data) => {
        savedData[key] = data
      }
    }

    saveUserSettings({ difficultyPreference: REALLY_EASY, isLoadingUserSettings: true }, storage)

    expect(savedData[USER_SETTINGS_KEY]).to.not.exist()
  })
})
