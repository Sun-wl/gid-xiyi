/**
 * Created by evan on 2016/6/17.
 */
import React, {Component, PropTypes} from 'react';
import CSSCore from 'fbjs/lib/CSSCore';
import classnames from 'classnames';

export default class Overlay extends Component {

  static displayName = 'ToastrOverlay';

  componentWillReceiveProps(nextProps){
    if(this.props.overlay.show && !nextProps.overlay.show){
      this.removeOverlay();
    }
  }

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    this.isHiding = false;
    if (this.props.overlay.show) {
      this._setTransition(true);
    }
  }

  removeOverlay() {
    this._removeOverlay();
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

  _removeOverlay = () => {
    this.isHiding = false;
    const html = document.querySelector('html');
    const body = document.querySelector('body')
    html.style.overflow=""
    CSSCore.removeClass(body, 'toastr-block-active');
  };

  handleTapEvent(e){
    e.preventDefault();
    e.stopPropagation();
  }
  render() {
    return (
      <div onTouchMove={(e) => this.handleTapEvent(e)} className={classnames('confirm-holder', {active: this.props.overlay.show})}>
        <div className="overlay"></div>
      </div>
    );
  }
}
