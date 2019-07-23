import React, {Component, PropTypes} from 'react'
import cn from 'classnames'
import CSSCore from 'fbjs/lib/CSSCore'
import {FormattedMessage as Text} from 'react-intl'
import Button from './Button'

export default class ToastrTips extends Component {

  static displayName = 'ToastrTips'

  static propTypes = {
    tips: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props)
  }
  
  componentWillReceiveProps(nextProps){
    if(this.props.tips.show && !nextProps.tips.show){
      this.handleCancelClick();
    }
  }
  componentDidUpdate() {
    this.isHiding = false
    if (this.props.tips.show) {
      this._setTransition(true)
    }
  }

  handleTipsClick() {
    const {options} = this.props.tips
    this._removeTips()
    if (options && options.onOk) {
      options.onOk()
    }
    this._setTransition()
  }

  handleCancelClick() {
    const {options} = this.props.tips
    this._removeTips()
    if (options && options.onCancel) {
      options.onCancel()
    }
    this._setTransition()
  }
  _setTransition = (add) => {
    const html = document.querySelector('html')
    const body = document.querySelector('body')

    if (add) {
      this.isHiding = false
      html.style.overflow="hidden"
       CSSCore.addClass(body, 'toastr-block-active')
      return
    }
    this.isHiding = true
  }

  _removeTips = () => {
    this.isHiding = false
    this.props.hideTips()
    const html = document.querySelector('html')
    const body = document.querySelector('body')
    html.style.overflow=""
    CSSCore.removeClass(body, 'toastr-block-active')
  }

  render() {
    const classes = cn('tip-confirm-holder', {active: this.props.tips.show})
    return (
      <div className={classes}>
        <div className="confirm" ref={ref => this.tips = ref}>
          {this.props.tips.title && <div className="title"><Text defaultMessage ={this.props.tips.title} id={this.props.tips.title}/></div>}
          {this.props.tips.message && <div className="message"><Text defaultMessage ={this.props.tips.message} id={this.props.tips.message}/></div>}
          <Button onClick={this.handleTipsClick.bind(this)}>
            {(this.props.tips.options && this.props.tips.options.okText)?
              <Text defaultMessage ={this.props.tips.options.okText} id={this.props.tips.options.okText}/>:
              <Text defaultMessage ={this.props.okText} id={this.props.okText}/>
            }
          </Button>
          <Button onClick={this.handleCancelClick.bind(this)}>
            {(this.props.tips.options && this.props.tips.options.cancelText)?
              <Text defaultMessage ={this.props.tips.options.cancelText} id={this.props.tips.options.cancelText}/>:
              <Text defaultMessage ={this.props.cancelText} id={this.props.cancelText}/>
            }
          </Button>
        </div>
        <div className="shadow"></div>
      </div>
    )
  }
}
