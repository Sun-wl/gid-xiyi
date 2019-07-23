import React, {Component} from 'react'
export default class Button extends Component {
  static displayName = 'ReduxConfirmButton'
  constructor(props) {
    super(props)
  }
  handleClick = (e) => {
    e.preventDefault()
    if (this.props.onClick) {
      this.props.onClick && this.props.onClick()
    }
  }
  render() {
    return (
      <button type="button" onClick={e => this.handleClick(e)}> <p>{this.props.children}</p> </button>
    )
  }
}
