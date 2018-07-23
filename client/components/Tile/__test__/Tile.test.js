import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'

import Tile from '../index'

describe('<Tile/>', () => {
  it('should render', () => {
    const wrapper = mount(<Tile value={0} />)
    expect(wrapper.find('button')).to.have.length(1)
  })
})
