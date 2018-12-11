import { Component } from 'react'
import PropTypes from 'prop-types'

class DataGridItem extends Component {
  static propTypes = {
    children: PropTypes.func,
    render: PropTypes.func
  }

  static defaultProps = {
    children: () => null,
    render: () => null
  }

  render () {
    const { children, render = children } = this.props

    return render()
  }
}

export default DataGridItem
