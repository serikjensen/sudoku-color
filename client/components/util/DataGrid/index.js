import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class DataGrid extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired
  }

  render () {
    const { label, children } = this.props

    return (
      <table
        role="grid"
        aria-label={label}
      >
        {children}
      </table>
    )
  }
}
