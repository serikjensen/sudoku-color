import React from 'react'

import { expect, find, mount, spy, wait } from '@instructure/ui-test-utils'
import TrayLocator from '@instructure/ui-tray/es/Tray/locator'

import { MEDIUM, HARD } from '../../../constants/difficultyTypes'

import { AppMenu } from '../index'

const ThemePicker = () => <div>theme picker</div>

describe('<AppMenu />', async () => {
  it('should open menu on trigger click', async () => {
    await mount(<AppMenu themePicker={ThemePicker} />)

    const trigger = await find('button:contains(Open menu)')
    await trigger.click()

    const tray = await TrayLocator.find(':label(Menu)')

    await wait(() => {
      expect(tray.containsFocus()).to.be.true()
    })
  })

  it('should close menu on close button click', async () => {
    await mount(<AppMenu themePicker={ThemePicker} />)

    const trigger = await find('button:contains(Open menu)')
    await trigger.click()

    const tray = await TrayLocator.find(':label(Menu)')

    await wait(() => {
      expect(tray.containsFocus()).to.be.true()
    })

    const closeButton = await tray.find('button:contains(Close menu)')
    await closeButton.click()

    await wait(() => {
      expect(trigger.focused()).to.be.true()
    })

    expect(await TrayLocator.find(':label(Menu)', { expectEmpty: true })).to.not.exist()
  })

  it('should fire request puzzle and onRequestPuzzle on when new puzzle button clicked', async () => {
    const requestPuzzle = spy()
    const onRequestPuzzle = spy()

    await mount(
      <AppMenu
        requestPuzzle={requestPuzzle}
        onRequestPuzzle={onRequestPuzzle}
        themePicker={ThemePicker}
      />
    )
    const trigger = await find('button:contains(Open menu)')
    await trigger.click()

    const tray = await TrayLocator.find(':label(Menu)')

    await wait(() => {
      expect(tray.containsFocus()).to.be.true()
    })

    const requestButton = await tray.find('button:contains(New Puzzle)')
    await requestButton.click()

    expect(requestPuzzle).to.have.been.calledOnce()
    expect(onRequestPuzzle).to.have.been.calledOnce()
    expect(await TrayLocator.find(':label(Menu)', { expectEmpty: true })).to.not.exist()
  })

  it('should reset puzzle and onResetPuzzle when reset puzzle button clicked', async () => {
    const resetPuzzle = spy()
    const onResetPuzzle = spy()

    await mount(
      <AppMenu
        resetPuzzle={resetPuzzle}
        onResetPuzzle={onResetPuzzle}
        themePicker={ThemePicker}
      />
    )
    const trigger = await find('button:contains(Open menu)')
    await trigger.click()

    const tray = await TrayLocator.find(':label(Menu)')

    await wait(() => {
      expect(tray.containsFocus()).to.be.true()
    })

    const requestButton = await tray.find('button:contains(Reset)')
    await requestButton.click()

    expect(resetPuzzle).to.have.been.calledOnce()
    expect(onResetPuzzle).to.have.been.calledOnce()
    expect(await TrayLocator.find(':label(Menu)', { expectEmpty: true })).to.not.exist()
  })

  it('should focus trigger after submitting a puzzle', async () => {
    const subject = await mount(
      <AppMenu submittedPuzzle themePicker={ThemePicker} />
    )

    await subject.setProps({ submittedPuzzle: false })

    const trigger = await find('button:contains(Open menu)')
    expect(trigger.focused()).to.be.true()
  })

  it('should properly check the difficulty setting provided', async () => {
    await mount(
      <AppMenu difficultyPreference={MEDIUM} themePicker={ThemePicker} />
    )

    const trigger = await find('button:contains(Open menu)')
    await trigger.click()

    const tray = await TrayLocator.find(':label(Menu)')

    await wait(() => {
      expect(tray.containsFocus()).to.be.true()
    })

    expect(await find(`input[type="radio"][value="${MEDIUM}"]:checked`)).to.exist()
  })

  it('should call setDifficulty when input changes', async () => {
    const setDifficultyPreference = spy()

    await mount(
      <>
        <div id="flash-messages" role="alert" />
        <AppMenu
          difficultyPreference={MEDIUM}
          setDifficultyPreference={setDifficultyPreference}
          themePicker={ThemePicker}
        />
        <div id="visible-alerts" />
      </>
    )

    const trigger = await find('button:contains(Open menu)')
    await trigger.click()

    const tray = await TrayLocator.find(':label(Menu)')

    await wait(() => {
      expect(tray.containsFocus()).to.be.true()
    })

    const input = await find(`input[type="radio"][value="${HARD}"]`)
    await input.click()

    expect(setDifficultyPreference).to.have.been.calledOnce()
    expect(setDifficultyPreference.lastCall.args[0]).to.equal(HARD)
  })
})
