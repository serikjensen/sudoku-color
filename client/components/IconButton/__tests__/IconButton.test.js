import React from 'react'

import { expect, mount, find, spy } from '@instructure/ui-test-utils'

import IconButton from '../index'

describe.only('<IconButton />', async () => {
  it('should render label', async () => {
    await mount(<IconButton label="hello" />)
    expect(await find('button:contains(hello)')).to.exist()
  })

  it('should render icon', async () => {
    await mount(<IconButton icon={() => 'foo'} />)
    expect(await find('button:contains(foo)')).to.exist()
  })

  it('should call onClick', async () => {
    const onClick = spy()

    await mount(<IconButton label="hello" onClick={onClick} />)

    const button = await find('button')
    await button.click()

    expect(onClick).to.have.been.calledOnce()
  })
})
