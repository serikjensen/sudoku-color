import React from 'react'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { expect, mount, within, spy, wait } from '@instructure/ui-test-utils'
import PopoverLocator from '@instructure/ui-overlays/lib/Popover/locator'

import { puzzle1 } from '../../../util/__tests__/testPuzzles'
import { Cell } from '../index'

const mockStore = configureStore()

describe('<Cell/>', async () => {
  it('should render presentationally if value is less than 0', async () => {
    const subject = await mount(
      <Cell
        value={-1}
        coords={{ i: 5, j: 7 }}
      />
    )

    const cell = within(subject.getDOMNode())

    expect(await cell.find('button', { expectEmpty: true })).to.not.exist()
  })

  it('should render a button if value is greater than or equal to 0', async () => {
    const subject = await mount(
      <Cell
        value={0}
        coords={{ i: 5, j: 7 }}
      />
    )

    const cell = within(subject.getDOMNode())

    expect(await cell.find('button')).to.exist()

    await subject.setProps({ value: 1 })

    expect(await cell.find('button')).to.exist()
  })

  it('should set tabIndex', async () => {
    const subject = await mount(
      <Cell
        value={0}
        coords={{ i: 5, j: 7 }}
        tabIndex="0"
      />
    )

    const cell = within(subject.getDOMNode())

    expect(await cell.find('button')).to.have.attribute('tabindex', '0')

    await subject.setProps({ tabIndex: '-1' })

    expect(await cell.find('button')).to.have.attribute('tabindex', '-1')
  })

  it('should focus when the focused prop is set', async () => {
    const subject = await mount(
      <Cell
        value={0}
        coords={{ i: 5, j: 7 }}
        tabIndex="0"
      />
    )

    const cell = within(subject.getDOMNode())

    expect((await cell.find('button')).focused()).to.be.false()

    await subject.setProps({ focused: true })

    expect((await cell.find('button')).focused()).to.be.true()
  })

  it('should call onClick with coords and value', async () => {
    const store = mockStore({ puzzle: { puzzle: puzzle1 } })

    const onClick = spy()
    const coords = { i: 5, j: 7 }
    const value = 1

    const subject = await mount(
      <Provider store={store}>
        <Cell
          value={value}
          coords={coords}
          onClick={onClick}
        />
      </Provider>
    )

    const cell = within(subject.getDOMNode())
    const button = await cell.find('button')

    await button.click()

    expect(onClick).to.have.been.calledOnce()

    const data = onClick.lastCall.args[1]
    expect(data.coords).to.deep.equal(coords)
    expect(data.value).to.equal(value)
  })

  it('should call onMouseEnter with coords and value', async () => {
    const onMouseEnter = spy()
    const coords = { i: 4, j: 2 }
    const value = 5

    const subject = await mount(
      <Cell
        value={value}
        coords={coords}
        onMouseEnter={onMouseEnter}
      />
    )

    const cell = within(subject.getDOMNode())
    const button = await cell.find('button')

    await button.mouseEnter()

    expect(onMouseEnter).to.have.been.calledOnce()

    const data = onMouseEnter.lastCall.args[1]
    expect(data.coords).to.deep.equal(coords)
    expect(data.value).to.equal(value)
  })

  it('should call onMouseLeave with coords and value', async () => {
    const onMouseLeave = spy()
    const coords = { i: 4, j: 2 }
    const value = 5

    const subject = await mount(
      <Cell
        value={value}
        coords={coords}
        onMouseEnter={onMouseLeave}
      />
    )

    const cell = within(subject.getDOMNode())
    const button = await cell.find('button')

    await button.mouseEnter()

    expect(onMouseLeave).to.have.been.calledOnce()

    const data = onMouseLeave.lastCall.args[1]
    expect(data.coords).to.deep.equal(coords)
    expect(data.value).to.equal(value)
  })

  it('should call setTile with value and coords', async () => {
    const store = mockStore({ puzzle: { puzzle: puzzle1 } })

    const setTile = spy()
    const coords = { i: 4, j: 2 }
    const value = 0

    const subject = await mount(
      <Provider store={store}>
        <Cell
          value={value}
          coords={coords}
          setTile={setTile}
        />
      </Provider>
    )

    const popover = await PopoverLocator.find()

    const cell = within(subject.getDOMNode())
    const button = await cell.find('button')

    await button.click()

    const content = await popover.findContent()

    await wait(() => {
      expect(content.containsFocus()).to.be.true()
    })

    const tile = await content.find('button:contains(5)')

    await tile.click()

    expect(setTile).to.have.been.calledOnce()

    const { args } = setTile.lastCall
    expect(args[0]).to.deep.equal(coords)
    expect(args[1]).to.equal(5)
  })

  it('should call setTile with when key down with values 1-9', async () => {
    const setTile = spy()
    const coords = { i: 4, j: 2 }
    const value = 5

    const subject = await mount(
      <Cell
        value={value}
        coords={coords}
        setTile={setTile}
      />
    )

    const cell = within(subject.getDOMNode())
    const button = await cell.find('button')
    expect(button).to.exist()

    await button.keyDown(48)
    await button.keyDown(58)

    expect(setTile).to.not.have.been.called()

    await button.keyDown(49)

    const getArgs = () => setTile.lastCall.args
    expect(getArgs()[0]).to.deep.equal(coords)
    expect(getArgs()[1]).to.equal(1)

    await button.keyDown(57)

    expect(getArgs()[0]).to.deep.equal(coords)
    expect(getArgs()[1]).to.equal(9)
  })

  it('should call setTile with 0 when delete key', async () => {
    const setTile = spy()
    const coords = { i: 4, j: 2 }
    const value = 5

    const subject = await mount(
      <Cell
        value={value}
        coords={coords}
        setTile={setTile}
      />
    )

    const cell = within(subject.getDOMNode())
    const button = await cell.find('button')
    expect(button).to.exist()

    await button.keyDown(8)

    const { args } = setTile.lastCall
    expect(args[0]).to.deep.equal(coords)
    expect(args[1]).to.equal(0)
  })

  it('should call onMenuShow when clicked with value and coords', async () => {
    const store = mockStore({ puzzle: { puzzle: puzzle1 } })

    const onMenuShow = spy()
    const coords = { i: 4, j: 2 }
    const value = 0

    const subject = await mount(
      <Provider store={store}>
        <Cell
          value={value}
          coords={coords}
          onMenuShow={onMenuShow}
          tabIndex="0"
        />
      </Provider>
    )

    const popover = await PopoverLocator.find()

    const cell = within(subject.getDOMNode())
    const button = await cell.find('button')
    expect(button).to.exist()

    await button.click()

    const content = await popover.findContent()

    await wait(() => {
      expect(content.containsFocus()).to.be.true()
    })

    expect(onMenuShow).to.have.been.calledOnce()

    const data = onMenuShow.lastCall.args[1]
    expect(data.coords).to.deep.equal(coords)
    expect(data.value).to.equal(value)
  })

  it('should call onMenuDismiss when value is selected', async () => {
    const store = mockStore({ puzzle: { puzzle: puzzle1 } })

    const onMenuDismiss = spy()
    const coords = { i: 4, j: 2 }
    const value = 0

    const subject = await mount(
      <Provider store={store}>
        <Cell
          value={value}
          coords={coords}
          onMenuDismiss={onMenuDismiss}
          tabIndex="0"
        />
      </Provider>
    )

    const popover = await PopoverLocator.find()

    const cell = within(subject.getDOMNode())
    const button = await cell.find('button')
    expect(button).to.exist()

    await button.click()

    const content = await popover.findContent()

    await wait(() => {
      expect(content.containsFocus()).to.be.true()
    })

    const tile = await content.find('button:contains(5)')

    await tile.click()

    expect(onMenuDismiss).to.have.been.calledOnce()
  })
})
