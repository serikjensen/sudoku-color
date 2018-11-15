import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'

import Tile from '../index'
import lastCall from '../../../../test/testUtils'

describe('<Tile/>', () => {
  it('should call onClick with event and value', () => {
    const onClick = sinon.spy()
    const wrapper = mount(<Tile value={0} onClick={onClick} />)
    const button = wrapper.find('button')
    button.simulate('click')

    expect(lastCall(onClick)[0].type).to.equal('click')
    expect(lastCall(onClick)[1]).to.equal(0)
  })
})
