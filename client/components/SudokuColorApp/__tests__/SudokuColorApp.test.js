import React from 'react'

import { expect, find, mount, spy, wait } from '@instructure/ui-test-utils'

import { SudokuColorApp } from '../index'
import { puzzle1 } from '../../../util/__tests__/testPuzzles'

import { Board } from '../../Board'
import { AppMenu } from '../../AppMenu'
import { SubmitModal } from '../../SubmitModal'
import { Cell } from '../../Cell'

const StubbedBoard = React.forwardRef((props, ref) => (
  <Board
    {...props}
    ref={ref}
    puzzle={puzzle1}
    cell={Cell}
  />
))

describe('<SudokuColorApp />', async () => {
  it('should call loadPuzzle when mounted', async () => {
    const loadPuzzle = spy()
    const loadingIndicator = () => <div>Loading</div>

    await mount(
      <SudokuColorApp
        loadPuzzle={loadPuzzle}
        board={StubbedBoard}
        appMenu={AppMenu}
        submitModal={SubmitModal}
        loadingIndicator={loadingIndicator}
      />
    )
    await wait(() => {
      expect(loadPuzzle).to.have.been.calledOnce()
    })
  })

  it('should display loading while loading puzzle', async () => {
    const loadingIndicator = () => <div>Loading</div>

    await mount(
      <SudokuColorApp
        isLoadingUserSettings={false}
        requestingPuzzle
        board={StubbedBoard}
        appMenu={AppMenu}
        submitModal={SubmitModal}
        loadingIndicator={loadingIndicator}
      />
    )

    expect(await find(':contains(Loading)')).to.exist()
  })

  it('should display loading while loading user settings', async () => {
    const loadingIndicator = () => <div>Loading</div>

    await mount(
      <SudokuColorApp
        requestingPuzzle={false}
        isLoadingUserSettings
        board={StubbedBoard}
        appMenu={AppMenu}
        submitModal={SubmitModal}
        loadingIndicator={loadingIndicator}
      />
    )

    expect(await find(':contains(Loading)')).to.exist()
  })

  it('should not display loading after puzzle and user settings are loaded', async () => {
    const loadingIndicator = () => <div>Loading</div>

    await mount(
      <SudokuColorApp
        isLoadingUserSettings={false}
        requestingPuzzle={false}
        board={StubbedBoard}
        appMenu={AppMenu}
        submitModal={SubmitModal}
        loadingIndicator={loadingIndicator}
      />
    )

    expect(await find(':contains(Loading)', { expectEmpty: true })).to.not.exist()
  })

  it('should not display an undo button when you cannot undo', async () => {
    await mount(
      <SudokuColorApp
        requestingPuzzle={false}
        isLoadingUserSettings={false}
        board={StubbedBoard}
        appMenu={AppMenu}
        submitModal={SubmitModal}
        canUndo={false}
      />
    )

    expect(await find('button:contains(Undo)', { expectEmpty: true })).to.not.exist()
  })

  it('should display an undo button when you can undo', async () => {
    await mount(
      <SudokuColorApp
        requestingPuzzle={false}
        isLoadingUserSettings={false}
        board={StubbedBoard}
        appMenu={AppMenu}
        submitModal={SubmitModal}
        canUndo
      />
    )

    expect(await find('button:contains(Undo)')).to.exist()
  })

  it('should call undoSetTile when undo button is clicked', async () => {
    const undoSetTile = spy()

    await mount(
      <SudokuColorApp
        requestingPuzzle={false}
        isLoadingUserSettings={false}
        board={StubbedBoard}
        appMenu={AppMenu}
        submitModal={SubmitModal}
        undoSetTile={undoSetTile}
        canUndo
      />
    )

    const undoButton = await find('button:contains(Undo)')

    await undoButton.click()

    expect(undoSetTile).to.have.been.calledOnce()
  })
})
