/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import ContactInput from 'components/Address/ContactInput'
import classnames from 'classnames'
import {push } from 'react-router-redux'

class ContactsInfoForm extends Component {
  constructor(props, context) {
    super(props, context)
    this.locale =  context.intl.locale
    this.dispatch = context.store.dispatch
  }

  componentWillMount(){
    this.props.selectContactAction()
  }

  selectContact(){
    this.dispatch(push('/contact/select'))
  }

  render() {
    const {id} = this.props.field
    return (<ContactInput
      className={classnames({'boder-div':true, 'error':id.error  && id.touched})}
      contact={this.props.contact}
      locale={this.locale}
      selectContact={::this.selectContact}/>)
  }
}

ContactsInfoForm.contextTypes = {
  intl: PropTypes.object.isRequired,
  store: React.PropTypes.object.isRequired
}

ContactsInfoForm.propTypes = {
  contact:PropTypes.object,
  field:PropTypes.object.isRequired,
  selectContactAction:PropTypes.func.isRequired
}

export default ContactsInfoForm
