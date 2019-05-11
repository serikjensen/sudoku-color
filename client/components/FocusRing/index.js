import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import themeable from '../theming/themeable'
import composeTheme from './theme'
import { FocusRingStyles } from './styles'

class FocusRing extends PureComponent {
  static propTypes = {
    shape: PropTypes.oneOf(['rectangular', 'circular']),
    focused: PropTypes.bool
  }

  static defaultProps = {
    shape: 'rectangular',
    focused: false
  }

  render () {
    return <FocusRingStyles {...this.props} />
  }
}

export default themeable(FocusRing, composeTheme)
