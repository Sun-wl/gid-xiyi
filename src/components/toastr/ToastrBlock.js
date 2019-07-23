import React, {Component, PropTypes} from 'react';
import cn from 'classnames';
import CSSCore from 'fbjs/lib/CSSCore';
import {FormattedMessage as Text} from 'react-intl'
import loadingImg from 'static/img/loading.gif'

export default class ToastrBlock extends Component {
  static displayName = 'ToastrBlock';

  static propTypes = {
    block: PropTypes.object.isRequired,
    blcokOptions: PropTypes.object
  };

  componentWillReceiveProps(nextProps){
    if(this.props.block.show && !nextProps.block.show){
       this.removeBlock();
    }
  }

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    this.isHiding = false;
    if (this.props.block.show) {
      this._setTransition(true);
    }
  }

  removeBlock() {
    this._removeBlock();
  }

  _setTransition = (add) => {
    const html = document.querySelector('html');
    const body = document.querySelector('body')
    if (add) {
      this.isHiding = false;
      CSSCore.addClass(body, 'toastr-block-active');
      html.style.overflow="hidden"
      return;
    }
    this.isHiding = true;
  };

  _removeBlock = () => {
    this.isHiding = false;
    const html = document.querySelector('html');
    const body = document.querySelector('body')
    html.style.overflow=""
    CSSCore.removeClass(body, 'toastr-block-active');
  };

  render() {
    const classes = cn('confirm-holder', {active: this.props.block.show});
    return (
      <div className={classes}>
        <div className="confirm" ref={ref => this.block = ref}>
          <div className="message">
            <div>
              {this.props.block.icon && <img className="loadingImg" src={loadingImg}/>}
            </div>
            <div className="text">
              {this.props.block.message && <Text id={this.props.block.message} defaultMessage={this.props.block.message}/>}
            </div>
          </div>
        </div>
        <div className="shadow"></div>
      </div>
    );
  }
}
