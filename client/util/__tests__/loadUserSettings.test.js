import { expect, spy } from '@instructure/ui-test-utils'
import { USER_SETTINGS_KEY } from '../../constants/storageTypes'
import loadUserSettings from '../loadUserSettings'
import { REALLY_EASY, MEDIUM } from '../../constants/difficultyTypes'

const createStorage = (data = {}) => ({
  getItem: key => data[key]
})

describe('loadUserSettings', () => {
  it('should default to REALLY_EASY difficulty if nothing is in local storage', () => {
    const onLoad = spy()
    const storage = createStorage()

    loadUserSettings(onLoad, storage)

    expect(onLoad).to.have.been.calledOnce()

    const { difficultyPreference } = onLoad.lastCall.args[0]

    expect(difficultyPreference).to.equal(REALLY_EASY)
  })

  it('should load the difficulty preference in storage if it is saved there', () => {
    const onLoad = spy()
    const storage = createStorage({
      [USER_SETTINGS_KEY]: JSON.stringify({
        difficultyPreference: MEDIUM
      })
    })

    loadUserSettings(onLoad, storage)

    expect(onLoad).to.have.been.calledOnce()

    const { difficultyPreference } = onLoad.lastCall.args[0]

    expect(difficultyPreference).to.equal(MEDIUM)
  })
})
