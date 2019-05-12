import { expect, mount, spy, within } from '@instructure/ui-test-utils'

import React from 'react'

import Tile from '../index'

describe.only('<Tile/>', async () => {
  it('should apply tabIndex', async () => {
    const subject = await mount(
      <Tile
        value={1}
        coords={{ i: 1, j: 5 }}
        label="1"
        tabIndex="-1"
      />
    )

    const tile = within(subject.getDOMNode())
    expect(tile.getAttribute('tabIndex')).to.equal('-1')

    await subject.setProps({ tabIndex: '0' })

    expect(tile.getAttribute('tabIndex')).to.equal('0')
  })

  it('should render the label', async () => {
    const subject = await mount(
      <Tile
        value={1}
        coords={{ i: 1, j: 5 }}
        label="54"
        tabIndex="-1"
      />
    )

    const tile = within(subject.getDOMNode())
    expect(await tile.find(':textContent(54)')).to.exist()
  })

  it('should render as a clickable element for all facades except "presentation"', async () => {
    const subject = await mount(
      <Tile
        value={1}
        coords={{ i: 1, j: 5 }}
        label="54"
        tabIndex="-1"
      />
    )

    const tile = within(subject.getDOMNode())
    expect(await tile.find('button')).to.exist()

    await subject.setProps({ facade: 'edit' })
    expect(await tile.find('button')).to.exist()

    await subject.setProps({ facade: 'remove' })
    expect(await tile.find('button')).to.exist()
  })

  it('should render as a presentational element for presentation facade', async () => {
    const subject = await mount(
      <Tile
        value={1}
        coords={{ i: 1, j: 5 }}
        label="54"
        tabIndex="-1"
        facade="presentation"
      />
    )

    const tile = within(subject.getDOMNode())
    expect(tile.getTagName()).to.equal('span')
  })

  it('should call onClick with coords and value', async () => {
    const onClick = spy()
    const coords = { i: 5, j: 7 }
    const value = 1

    const subject = await mount(
      <Tile
        value={value}
        coords={coords}
        label="1"
        onClick={onClick}
      />
    )

    const tile = within(subject.getDOMNode())
    const button = await tile.find('button')

    await button.click()

    expect(onClick).to.have.been.calledOnce()

    const data = onClick.lastCall.args[1]
    expect(data.coords).to.deep.equal(coords)
    expect(data.value).to.equal(value)
  })

  it('should call onKeyDown with coords and value', async () => {
    const onKeyDown = spy()
    const coords = { i: 6, j: 2 }
    const value = 5

    const subject = await mount(
      <Tile
        value={value}
        coords={coords}
        label="1"
        onKeyDown={onKeyDown}
      />
    )

    const tile = within(subject.getDOMNode())
    const button = await tile.find('button')

    await button.keyDown('left')

    expect(onKeyDown).to.have.been.calledOnce()

    const data = onKeyDown.lastCall.args[1]
    expect(data.coords).to.deep.equal(coords)
    expect(data.value).to.equal(value)
  })

  it('should provide an elementRef', async () => {
    const elementRef = spy()

    const subject = await mount(
      <Tile
        value={1}
        coords={{ i: 1, j: 5 }}
        label="1"
        elementRef={elementRef}
      />
    )

    expect(elementRef).to.have.been.calledWith(subject.getDOMNode())
  })
})
