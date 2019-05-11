import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { createChainedFunction } from '@instructure/ui-utils'

class Focusable extends PureComponent {
  static propTypes = {
    render: PropTypes.func
  }

  static defaultProps = {
    render: () => null
  }

  state = {
    focused: false
  }

  get focused () {
    return this.state.focused
  }

  focus () {
    this.setState({ focused: true })
  }

  blur () {
    this.setState({ focused: false })
  }

  handleFocus = () => {
    this.focus()
  }

  handleBlur = () => {
    this.blur()
  }

  render () {
    const { render } = this.props

    const getFocusableProps = ({ onFocus, onBlur, ...props } = {}) => ({
      onFocus: createChainedFunction(onFocus, this.handleFocus),
      onBlur: createChainedFunction(onBlur, this.handleBlur),
      ...props
    })

    return render({ getFocusableProps, focused: this.state.focused })
  }
}

export default Focusable
