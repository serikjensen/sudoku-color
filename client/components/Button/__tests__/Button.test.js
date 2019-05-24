import React from 'react'

import { expect, mount, find, spy } from '@instructure/ui-test-utils'

import Button from '../index'

describe('<Button/>', async () => {
  it('should render children', async () => {
    await mount(<Button>hello</Button>)
    expect(await find('button:contains(hello)')).to.exist()
  })

  it('should call onClick', async () => {
    const onClick = spy()

    await mount(<Button onClick={onClick}>hello</Button>)

    const button = await find('button')
    await button.click()

    expect(onClick).to.have.been.calledOnce()
  })
})
