import React from 'react'

import { expect, mount, within, spy } from '@instructure/ui-test-utils'

import { puzzle1, puzzle3 } from '../../../util/__tests__/testPuzzles'
import { CellMenu } from '../index'

describe('<CellMenu />', async () => {
  it('should render all values when they are available in a puzzle', async () => {
    const subject = await mount(
      <CellMenu
        value={0}
        puzzle={puzzle1}
      />
    )

    const cellMenu = within(subject.getDOMNode())
    const buttons = await cellMenu.findAll('button')
    expect(buttons).to.have.length(9)
  })

  it('should render a remove button instead of the value if the cell has a value', async () => {
    const subject = await mount(
      <CellMenu
        value={4}
        puzzle={puzzle1}
      />
    )

    const cellMenu = within(subject.getDOMNode())
    const buttons = await cellMenu.findAll('button')
    expect(buttons).to.have.length(9)

    buttons.forEach((button) => {
      expect(button.getTextContent()).to.not.equal('4')
    })

    expect(await cellMenu.find('button:contains(Remove tile)')).to.exist()
  })

  it('should only render remove button if puzzle is all filled out', async () => {
    const subject = await mount(
      <CellMenu
        value={5}
        puzzle={puzzle3}
      />
    )

    const cellMenu = within(subject.getDOMNode())
    const buttons = await cellMenu.findAll('button')

    expect(buttons).to.have.length(1)
    expect(buttons[0]).to.have.text('Remove tile')
  })

  it('should call onSelect with the value of the selected tile', async () => {
    const value = 5
    const onSelect = spy()

    const subject = await mount(
      <CellMenu
        value={0}
        puzzle={puzzle1}
        onSelect={onSelect}
      />
    )

    const cellMenu = within(subject.getDOMNode())
    const button = await cellMenu.find(`button:contains(${value})`)

    await button.click()

    expect(onSelect).to.have.been.calledOnce()

    const data = onSelect.lastCall.args[1]
    expect(data.value).to.equal(value)
  })
})
