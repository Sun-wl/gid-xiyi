/**
 * Created by evan on 2016/5/12.
 */
import React, {PropTypes} from 'react'
import {FormattedMessage as Text} from 'react-intl'
import './Modal.scss'
import {replace} from 'react-router-redux'
import Tappable from 'react-tappable'

const Modal = ({children,location,dispatcher}) => {

  return (
    <div className={location.state.className||'default-model'}>
      {location.state.title && <div className="default-model-title" >
      <Text id={location.state.title} defaultMessage={location.state.title}/></div>}
      {location.state.goBackUrl &&
         <Tappable onTap={(e) => { dispatcher(replace({pathname: location.state.goBackUrl})) }}>
           <div className="default-model-btn">
             <button><Text id={location.state.btnText||'enter'} defaultMessage={location.state.btnText}/></button>
           </div>
         </Tappable>
      }
      {children}
    </div>
  )
}


Modal.propTypes = {
  children: React.PropTypes.element,
  location: React.PropTypes.object.isRequired,
  dispatcher: React.PropTypes.object.isRequired
}

export default Modal
