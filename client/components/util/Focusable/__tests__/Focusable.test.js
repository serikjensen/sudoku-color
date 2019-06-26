import React from 'react'
import { render as testLibRender, cleanup } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'

import { expect, spy, wait } from '@instructure/ui-test-utils'

import Focusable from '../index'

describe('<Focusable />', async () => {
  afterEach(cleanup)

  it('should call render with focused bool', async () => {
    const text = 'hello'
    /* eslint-disable react/prop-types */
    const render = ({ getFocusableProps }) => (
      <button type="button" {...getFocusableProps()}>{text}</button>
    )
    /* eslint-enable react/prop-types */

    const props = { render }

    const renderSpy = spy(props, 'render')

    // TODO: Remove dom test lib once ui-test-utils is more robust
    const { getByText } = testLibRender(<Focusable {...props} />)
    const focusable = getByText(text)

    await wait(() => {
      expect(renderSpy.lastCall.args[0].focused).to.be.false()
    })

    fireEvent.focus(focusable)
    await wait(() => {
      expect(renderSpy.lastCall.args[0].focused).to.be.true()
    })
  })
})
