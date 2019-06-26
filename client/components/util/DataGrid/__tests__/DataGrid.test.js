import React from 'react'

import { expect, mount, find, spy, wait } from '@instructure/ui-test-utils'
import { render as testLibRender, cleanup } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'

import DataGrid from '../index'

describe('<DataGrid />', async () => {
  afterEach(cleanup)

  describe('getRootProps', async () => {
    it('should provide aria-label', async () => {
      const label = 'Hello world'

      const props = {
        label,
        render: () => <div>foo</div>
      }

      const renderSpy = spy(props, 'render')

      await mount(
        <DataGrid {...props} />
      )

      expect(renderSpy).to.have.been.called()
      const { getRootProps } = renderSpy.lastCall.args[0]
      expect(getRootProps()['aria-label']).to.equal(label)
    })

    it('should provide role="grid"', async () => {
      const props = {
        label: 'Hello world',
        render: () => <div>foo</div>
      }

      const renderSpy = spy(props, 'render')

      await mount(
        <DataGrid {...props} />
      )

      expect(renderSpy).to.have.been.called()
      const { getRootProps } = renderSpy.lastCall.args[0]
      expect(getRootProps().role).to.equal('grid')
    })
  })

  describe('getCellProps', async () => {
    it('should provide tabIndex="-1" when not focused and tabIndex="0" when focused', async () => {
      const focusedCoords = { i: 4, j: 7 }

      const props = {
        label: 'Hello world',
        render: () => <div>foo</div>,
        focusedCoords
      }

      const renderSpy = spy(props, 'render')

      await mount(
        <DataGrid {...props} />
      )

      expect(renderSpy).to.have.been.called()
      const { getCellProps } = renderSpy.lastCall.args[0]
      expect(getCellProps({ coords: focusedCoords }).tabIndex).to.equal(0)
      expect(getCellProps({ coords: { i: 5, j: 8 } }).tabIndex).to.equal(-1)
    })
  })

  it('should call onFocus when focused', async () => {
    const focusedCoords = { i: 0, j: 0 }
    const onFocus = spy()

    const data = [['foo', 'bar']]

    /* eslint-disable react/no-array-index-key */
    /* eslint-disable react/prop-types */
    const props = {
      debug: true,
      label: 'Hello world',
      onFocus,
      render: ({ getRootProps, getCellProps }) => (
        <table {...getRootProps()}>
          <tbody>
            {data.map((row, i) => (
              <tr key={`${i}`}>
                {row.map((value, j) => (
                  <td key={`${j}`}>
                    <button type="button" {...getCellProps({ coords: { i, j } })}>
                      {value}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ),
      focusedCoords
    }
    /* eslint-enable react/prop-types */
    /* eslint-enable react/no-array-index-key */

    const { getByText } = testLibRender(<DataGrid {...props} />)
    const focusable = getByText('foo')
    fireEvent.focus(focusable)

    await wait(() => {
      expect(onFocus).to.have.been.calledOnce()
    })
  })

  it('should call onBlur', async () => {
    const focusedCoords = { i: 0, j: 0 }
    const onBlur = spy()

    const data = [['foo', 'bar']]

    /* eslint-disable react/no-array-index-key */
    /* eslint-disable react/prop-types */
    const props = {
      label: 'Hello world',
      onBlur,
      render: ({ getRootProps, getCellProps }) => (
        <table {...getRootProps()}>
          <tbody>
            {data.map((row, i) => (
              <tr key={`${i}`}>
                {row.map((value, j) => (
                  <td key={`${j}`}>
                    <button type="button" {...getCellProps({ coords: { i, j } })}>
                      {value}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ),
      focusedCoords
    }
    /* eslint-enable react/prop-types */
    /* eslint-enable react/no-array-index-key */

    const { getByText } = testLibRender(<DataGrid {...props} />)
    const focusable = getByText('foo')

    fireEvent.blur(focusable)

    await wait(() => {
      expect(onBlur).to.have.been.calledOnce()
    })
  })

  it('should call onRequestMove with the correct directions', async () => {
    const onRequestMove = spy()
    /* eslint-disable react/prop-types */
    const props = {
      onRequestMove,
      focusedCoords: { i: 0, j: 0 },
      label: 'Hello world',
      render: ({ getCellProps }) => <button type="button" {...getCellProps({ coords: { i: 0, j: 0 } })}>foo</button>
    }
    /* eslint-enable react/prop-types */

    await mount(<DataGrid {...props} />)

    const button = await find('button:contains(foo)')

    const lastCallDirection = (funcSpy) => funcSpy.lastCall.args[1].direction

    await button.keyDown('up')
    expect(lastCallDirection(onRequestMove)).to.deep.equal({ i: -1, j: 0 })

    await button.keyDown('down')
    expect(lastCallDirection(onRequestMove)).to.deep.equal({ i: 1, j: 0 })

    await button.keyDown('left')
    expect(lastCallDirection(onRequestMove)).to.deep.equal({ i: 0, j: -1 })

    await button.keyDown('right')
    expect(lastCallDirection(onRequestMove)).to.deep.equal({ i: 0, j: 1 })
  })
})
