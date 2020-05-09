import React from 'react'

import { expect, find, mount, spy } from '@instructure/ui-test-utils'

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

    await mount(
      <SudokuColorApp
        loadPuzzle={loadPuzzle}
        board={StubbedBoard}
        appMenu={AppMenu}
        submitModal={SubmitModal}
      />
    )

    expect(loadPuzzle).to.have.been.calledOnce()
  })

  it('should display loading while loading puzzle', async () => {
    await mount(
      <SudokuColorApp
        requestingPuzzle
        board={StubbedBoard}
        appMenu={AppMenu}
        submitModal={SubmitModal}
      />
    )

    expect(await find(':contains(Loading)')).to.exist()
  })

  it('should not display loading after puzzle is loaded', async () => {
    await mount(
      <SudokuColorApp
        requestingPuzzle={false}
        board={StubbedBoard}
        appMenu={AppMenu}
        submitModal={SubmitModal}
      />
    )

    expect(await find(':contains(Loading)', { expectEmpty: true })).to.not.exist()
  })
})
