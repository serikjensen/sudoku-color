import React from 'react'
import { expect, mount, find, findAll, wait } from '@instructure/ui-test-utils'
import { findAll as findAllStyled } from 'styled-components/test-utils'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { puzzle1 } from '../../../util/__tests__/testPuzzles'
import { TileHighlightStyles } from '../../Tile/TileHighlight/styles'

import { Board } from '../index'

describe('<Board />', async () => {
  it('should render children', async () => {
    const mockStore = configureStore()
    const store = mockStore()

    await mount(
      <Provider store={store}>
        <Board puzzle={puzzle1} />
      </Provider>
    )

    const tiles = await findAll('[tabindex]')
    expect(tiles.length).to.equal(81)
  })

  it('should move focus with arrow keys', async () => {
    const mockStore = configureStore()
    const store = mockStore()

    const puzzle = [
      [1, 4, 0, 0, 0, 0, 0, 0, 0],
      [2, 3, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    await mount(
      <Provider store={store}>
        <Board puzzle={puzzle} />
      </Provider>
    )

    const tile1 = await find('button:contains(1)')
    await tile1.focus()

    await wait(() => {
      expect(tile1.focused()).to.be.true()
      expect(tile1).to.have.attribute('tabindex', '0')
    })
    expect(await findAll('[tabindex="0"]')).to.have.length(1)

    await tile1.keyDown('down')
    const tile2 = await find('button:contains(2)')

    await wait(() => {
      expect(tile2.focused()).to.be.true()
      expect(tile2).to.have.attribute('tabindex', '0')
    })
    expect(await findAll('[tabindex="0"]')).to.have.length(1)

    await tile2.keyDown('right')
    const tile3 = await find('button:contains(3)')

    await wait(() => {
      expect(tile3.focused()).to.be.true()
      expect(tile3).to.have.attribute('tabindex', '0')
    })
    expect(await findAll('[tabindex="0"]')).to.have.length(1)

    await tile3.keyDown('up')
    const tile4 = await find('button:contains(4)')

    await wait(() => {
      expect(tile4.focused()).to.be.true()
      expect(tile4).to.have.attribute('tabindex', '0')
    })
    expect(await findAll('[tabindex="0"]')).to.have.length(1)
  })

  it('should highlight all same valued tiles on hover', async () => {
    const mockStore = configureStore()
    const store = mockStore()

    const puzzle = [
      [0, 0, 0, 2, 0, 0, 0, 0, 2],
      [0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 3, 0, 0, 0, 0, 0, 3, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 3, 0],
      [0, 3, 0, 2, 0, 3, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    const subject = await mount(
      <Provider store={store}>
        <Board puzzle={puzzle} />
      </Provider>
    )

    const tile1 = (await findAll('button:contains(1)'))[0]
    await tile1.mouseOver()

    await wait(() => {
      const highlightedTiles1 = findAllStyled(subject.getDOMNode(), TileHighlightStyles)
      expect(highlightedTiles1.length).to.equal(3)
    })

    await tile1.mouseOut()

    await wait(() => {
      const highlightedTiles1 = findAllStyled(subject.getDOMNode(), TileHighlightStyles)
      expect(highlightedTiles1.length).to.equal(0)
    })

    const tile2 = (await findAll('button:contains(2)'))[0]
    await tile2.mouseOver()

    await wait(() => {
      const highlightedTiles2 = findAllStyled(subject.getDOMNode(), TileHighlightStyles)
      expect(highlightedTiles2.length).to.equal(4)
    })

    await tile2.mouseOut()

    await wait(() => {
      const highlightedTiles2 = findAllStyled(subject.getDOMNode(), TileHighlightStyles)
      expect(highlightedTiles2.length).to.equal(0)
    })

    const tile3 = (await findAll('button:contains(3)'))[0]
    await tile3.mouseOver()

    await wait(() => {
      const highlightedTiles3 = findAllStyled(subject.getDOMNode(), TileHighlightStyles)
      expect(highlightedTiles3.length).to.equal(5)
    })

    await tile3.mouseOut()

    await wait(() => {
      const highlightedTiles3 = findAllStyled(subject.getDOMNode(), TileHighlightStyles)
      expect(highlightedTiles3.length).to.equal(0)
    })
  })

  it('should highlight all same valued tiles on focus', async () => {
    const mockStore = configureStore()
    const store = mockStore()

    const puzzle = [
      [1, 0, 0, 0, 0, 0, 0, 1, 0],
      [2, 3, 0, 3, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 3, 0, 0, 0, 0, 2, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 0, 0, 0, 0, 3],
      [0, 3, 0, 0, 0, 0, 0, 0, 0]
    ]

    const subject = await mount(
      <Provider store={store}>
        <Board puzzle={puzzle} />
      </Provider>
    )

    const tile1 = (await findAll('button:contains(1)'))[0]
    await tile1.focus()

    await wait(() => {
      const highlightedTiles1 = findAllStyled(subject.getDOMNode(), TileHighlightStyles)
      expect(highlightedTiles1.length).to.equal(3)
    })

    await tile1.keyDown('down')

    await wait(() => {
      const highlightedTiles2 = findAllStyled(subject.getDOMNode(), TileHighlightStyles)
      expect(highlightedTiles2.length).to.equal(4)
    })

    const tile2 = (await findAll('button:contains(2)'))[0]
    await tile2.keyDown('right')

    await wait(() => {
      const highlightedTiles3 = findAllStyled(subject.getDOMNode(), TileHighlightStyles)
      expect(highlightedTiles3.length).to.equal(5)
    })
  })

  it('should highlight all same valued tiles on click', async () => {
    const mockStore = configureStore()
    const store = mockStore()

    const puzzle = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 5, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 5, 0, 0, 0, 0, 5, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 5, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 5, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    const subject = await mount(
      <Provider store={store}>
        <Board puzzle={puzzle} />
      </Provider>
    )

    const tile = (await findAll('button:contains(5)'))[0]
    await tile.focus()
    await tile.click()

    await wait(() => {
      const highlightedTiles1 = findAllStyled(subject.getDOMNode(), TileHighlightStyles)
      expect(highlightedTiles1.length).to.equal(5)
    })
  })
})
