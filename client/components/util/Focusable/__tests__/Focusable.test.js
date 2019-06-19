import React from 'react'

import { expect, find, mount, spy, wait } from '@instructure/ui-test-utils'

import Focusable from '../index'

describe('<Focusable />', async () => {
  it('should call render with focused bool', async () => {
    /* eslint-disable react/prop-types */
    const render = ({ getFocusableProps }) => (
      <input {...getFocusableProps({ type: 'text' })} />
    )
    /* eslint-enable react/prop-types */

    const props = { render }

    const renderSpy = spy(props, 'render')

    await mount(<Focusable {...props} />)

    expect(renderSpy).to.have.been.calledOnce()

    const focused = () => renderSpy.lastCall.args[0].focused
    expect(focused()).to.be.false()

    const focusable = await find(':focusable')
    await focusable.focus()

    expect(focused()).to.be.true()
  })

  it('should provide focus and blur methods', async () => {
    let focusable
    /* eslint-disable react/prop-types */
    const render = ({ getFocusableProps }) => (
      <input {...getFocusableProps({ type: 'text', ref: (el) => { focusable = el } })} />
    )
    /* eslint-enable react/prop-types */

    const props = { render }

    const renderSpy = spy(props, 'render')

    await mount(<Focusable {...props} />)

    expect(renderSpy).to.have.been.calledOnce()

    const focused = () => renderSpy.lastCall.args[0].focused
    expect(focused()).to.be.false()

    focusable.focus()
    await wait(() => {
      expect(focused()).to.be.true()
    })

    focusable.blur()
    await wait(() => {
      expect(focused()).to.be.false()
    })
  })
})
