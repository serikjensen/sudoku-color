import { expect, mount, spy, within } from '@instructure/ui-test-utils'

import React from 'react'

import Tile from '../index'

import { testSelector as defaultFacadeSelector } from '../DefaultFacade'
import { testSelector as editFacadeSelector } from '../EditFacade'
import { testSelector as removeFacadeSelector } from '../RemoveFacade'
import { testSelector as tileHighlightSelector } from '../TileHighlight'

const queryTile = (node, selector) => {
  if (!node && !node.querySelector) return null

  return node.querySelector(`[${selector}]`)
}

describe('<Tile/>', async () => {
  describe('rendering facades and highlights', async () => {
    it('should render the DefaultFacade by default', async () => {
      const subject = await mount(
        <Tile
          value={1}
          coords={{ i: 1, j: 5 }}
          label="1"
        />
      )

      expect(queryTile(subject.getDOMNode(), defaultFacadeSelector)).to.exist()
    })

    it('should render the EditFacade', async () => {
      const subject = await mount(
        <Tile
          value={1}
          coords={{ i: 1, j: 5 }}
          label="1"
          facade="edit"
        />
      )
      expect(queryTile(subject.getDOMNode(), editFacadeSelector)).to.exist()
    })

    it('should render the RemoveFacade', async () => {
      const subject = await mount(
        <Tile
          value={1}
          coords={{ i: 1, j: 5 }}
          label="1"
          facade="remove"
        />
      )
      expect(queryTile(subject.getDOMNode(), removeFacadeSelector)).to.exist()
    })

    it('should highlight when highlighted is set', async () => {
      const subject = await mount(
        <Tile
          value={1}
          coords={{ i: 1, j: 5 }}
          label="1"
          highlighted
        />
      )
      expect(queryTile(subject.getDOMNode(), tileHighlightSelector)).to.exist()
    })
  })

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

  it('should focus when the focused prop is set', async () => {
    const subject = await mount(
      <Tile
        value={1}
        coords={{ i: 1, j: 5 }}
        label="1"
      />
    )

    const tile = within(subject.getDOMNode())

    expect((await tile.find('button')).focused()).to.be.false()

    await subject.setProps({ focused: true })

    expect((await tile.find('button')).focused()).to.be.true()
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
