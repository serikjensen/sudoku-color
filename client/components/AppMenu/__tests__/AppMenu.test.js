import React from 'react'

import { expect, find, mount, spy, wait } from '@instructure/ui-test-utils'
import TrayLocator from '@instructure/ui-overlays/lib/Tray/locator'

import { AppMenu } from '../index'

describe('<AppMenu />', async () => {
  it('should open menu on trigger click', async () => {
    await mount(<AppMenu />)

    const trigger = await find('button:contains(Open menu)')
    await trigger.click()

    const tray = await TrayLocator.find()

    await wait(() => {
      expect(tray.containsFocus()).to.be.true()
    })
  })

  it('should close menu on close button click', async () => {
    await mount(<AppMenu />)

    const trigger = await find('button:contains(Open menu)')
    await trigger.click()

    const tray = await TrayLocator.find()

    await wait(() => {
      expect(tray.containsFocus()).to.be.true()
    })

    const closeButton = await tray.find('button:contains(Close menu)')
    await closeButton.click()

    expect(await TrayLocator.find({ expectEmpty: true })).to.not.exist()
  })

  it('should fire request puzzle and onRequestPuzzle on when new puzzle button clicked', async () => {
    const requestPuzzle = spy()
    const onRequestPuzzle = spy()

    await mount(
      <AppMenu
        requestPuzzle={requestPuzzle}
        onRequestPuzzle={onRequestPuzzle}
      />
    )
    const trigger = await find('button:contains(Open menu)')
    await trigger.click()

    const tray = await TrayLocator.find()

    await wait(() => {
      expect(tray.containsFocus()).to.be.true()
    })

    const requestButton = await tray.find('button:contains(New Puzzle)')
    await requestButton.click()

    expect(requestPuzzle).to.have.been.calledOnce()
    expect(onRequestPuzzle).to.have.been.calledOnce()
    expect(await TrayLocator.find({ expectEmpty: true })).to.not.exist()
  })

  it('should reset puzzle and onResetPuzzle when reset puzzle button clicked', async () => {
    const resetPuzzle = spy()
    const onResetPuzzle = spy()

    await mount(
      <AppMenu
        resetPuzzle={resetPuzzle}
        onResetPuzzle={onResetPuzzle}
      />
    )
    const trigger = await find('button:contains(Open menu)')
    await trigger.click()

    const tray = await TrayLocator.find()

    await wait(() => {
      expect(tray.containsFocus()).to.be.true()
    })

    const requestButton = await tray.find('button:contains(Reset)')
    await requestButton.click()

    expect(resetPuzzle).to.have.been.calledOnce()
    expect(onResetPuzzle).to.have.been.calledOnce()
    expect(await TrayLocator.find({ expectEmpty: true })).to.not.exist()
  })

  it('should focus trigger after submitting a puzzle', async () => {
    const subject = await mount(
      <AppMenu submittedPuzzle />
    )

    await subject.setProps({ submittedPuzzle: false })

    const trigger = await find('button:contains(Open menu)')
    expect(trigger.focused()).to.be.true()
  })
})
