/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import {localStorage} from 'common'
import ContactInput from 'components/Address/ContactInput'
import NativeJsBridge from '../../NativeJsBridge'
import  {EE} from 'common'
import classnames from 'classnames'

class ContactsInfoForm extends Component {

  constructor(props, context) {
    super(props, context)
    this.locale =  context.intl.locale
  }

  componentDidMount() {
    this.props.selectContactAction()
    EE.on('app/select/contact', this.props.selectContactAction)
  }

  componentWillUnmount() {
    EE.removeListener('app/select/contact')
  }

  selectContact(id){
    NativeJsBridge.selectContact(id, (data)=>{
      EE.emit('app/select/contact', typeof data ==='string' ? JSON.parse(data):data)
    })
  }

  render() {
    const {id} = this.props.field
    return (
      <ContactInput
        className={classnames({'boder-div':true, 'error':id.error  && id.touched})}
        contact={this.props.contact}
        locale={this.locale}
        selectContact={::this.selectContact} />
    )
  }
}

ContactsInfoForm.contextTypes = {
  intl: PropTypes.object.isRequired
}

ContactsInfoForm.propTypes = {
  contact:PropTypes.object,
  selectContactAction:PropTypes.func.isRequired,
  field:PropTypes.object.isRequired
}

export default ContactsInfoForm
