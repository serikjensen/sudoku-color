import { expect, mount, spy, within } from '@instructure/ui-test-utils'

import React from 'react'

import Tile from '../index'

describe('<Tile/>', async () => {
  it('should call onClick with event and value', async () => {
    const onClick = spy()

    const subject = await mount(
      <Tile
        value={1}
        coords={{ i: 0, j: 0 }}
        label="1"
        onClick={onClick}
      />
    )

    const tile = within(subject.getDOMNode())
    const button = await tile.find(':focusable')

    await button.click()

    expect(onClick).to.have.been.calledOnce()
  })
})
