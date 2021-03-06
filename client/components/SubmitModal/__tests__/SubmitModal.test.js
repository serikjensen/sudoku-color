import React from 'react'

import { expect, find, mount, spy } from '@instructure/ui-test-utils'
import ModalLocator from '@instructure/ui-modal/es/Modal/locator'

import { SubmitModal } from '../index'
import { HARD } from '../../../constants/difficultyTypes'

describe('<SubmitModal />', async () => {
  it('should only display submit puzzle button when puzzle is filled', async () => {
    const subject = await mount(<SubmitModal />)

    const submitButtonQuery = 'button:contains(Submit puzzle)'
    expect(await find(submitButtonQuery, { expectEmpty: true })).to.not.exist()

    await subject.setProps({ filledPuzzle: true })

    expect(await find(submitButtonQuery)).to.exist()
  })

  it('should call submitPuzzle', async () => {
    const submitPuzzle = spy()
    await mount(<SubmitModal filledPuzzle submitPuzzle={submitPuzzle} />)

    const button = await find('button:contains(Submit puzzle)')
    await button.click()

    expect(submitPuzzle).to.have.been.calledOnce()
  })

  it('should display a success message if puzzle is valid', async () => {
    await mount(<SubmitModal awardHero={() => <div>Congratulations!</div>} submittedPuzzle validPuzzle />)

    const modal = await ModalLocator.find()
    expect(await modal.find(':contains(Congratulations!)')).to.exist()
  })

  it('should display an invalid puzzle message if puzzle is invalid', async () => {
    await mount(<SubmitModal submittedPuzzle validPuzzle={false} incorrectHero={() => 'Whoops!'} />)

    const modal = await ModalLocator.find()
    expect(await modal.find(':contains(Whoops!)')).to.exist()
  })

  it('should call continue puzzle if the close button is selected', async () => {
    const continuePuzzle = spy()
    await mount(<SubmitModal submittedPuzzle continuePuzzle={continuePuzzle} incorrectHero={() => 'Whoops!'} />)

    const modal = await ModalLocator.find()
    const closeButton = await modal.find('button:contains(Close)')
    await closeButton.click()

    expect(continuePuzzle).to.have.been.calledOnce()
  })

  it('should call resetPuzzle and onResetPuzzle if the reset button is selected', async () => {
    const resetPuzzle = spy()
    const onResetPuzzle = spy()
    await mount(
      <SubmitModal
        submittedPuzzle
        resetPuzzle={resetPuzzle}
        onResetPuzzle={onResetPuzzle}
        incorrectHero={() => 'Whoops!'}
      />
    )

    const modal = await ModalLocator.find()
    const resetButton = await modal.find('button:contains(Reset)')
    await resetButton.click()

    expect(resetPuzzle).to.have.been.calledOnce()
    expect(onResetPuzzle).to.have.been.calledOnce()
  })

  it('should call requestPuzzle and onRequestPuzzle if the new puzzle button is selected', async () => {
    const requestPuzzle = spy()
    const onRequestPuzzle = spy()
    await mount(
      <SubmitModal
        submittedPuzzle
        requestPuzzle={requestPuzzle}
        onRequestPuzzle={onRequestPuzzle}
        difficultyPreference={HARD}
        incorrectHero={() => 'Whoops!'}
      />
    )

    const modal = await ModalLocator.find()
    const newPuzzleButton = await modal.find('button:contains(New Puzzle)')
    await newPuzzleButton.click()

    expect(requestPuzzle).to.have.been.calledOnce()
    expect(onRequestPuzzle).to.have.been.calledOnce()
  })
})
