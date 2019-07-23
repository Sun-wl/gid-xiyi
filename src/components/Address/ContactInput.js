/**
 * Created by evan on 2016/2/24.
 */
import React, {Component,PropTypes} from 'react'
import {FormattedMessage as Text} from 'react-intl'
import addressImage  from 'static/img/address.png'
import customer  from 'static/img/customer.png'
import edit  from 'static/img/edit.png'
import search  from 'static/img/search.png'
import leftlocation  from 'static/img/leftlocation.png'
import {formatDetails}  from 'common'

const initContact = (contact, locale, selectContact) => {
  return (
    <section className="bd">
      <div className="float-l w-88 chg-line">
        <div className="items">
          <img src={addressImage} width="18"/>
          <span className="pd-l-4">{locale === 'en' ?`${formatDetails(contact.details,locale)}${contact.address} ${contact.city}` :
                 `${contact.city} ${contact.address} ${formatDetails(contact.details,locale)}`}
          </span>
        </div>
        <div className="items">
          <img src={customer} width="18"/>
          <span className="pd-l-4">{contact.name}</span>
          <span className="pd-l-4">{contact.mobile}</span>
        </div>
      </div>
      <div className="float-r pd-t-10" onClick={() => selectContact(contact.id)} >
        <img src={edit} width="22px"/>
      </div>
      <div className="clear"></div>
    </section>
  )
}

const contactSelector = (className, selectContact)=> {
  return (
    <section className='bd'>
      <div className={className} onClick={() => selectContact('0')}>
        <img src={leftlocation}/>
        <span className="hint-span"><Text id='contact.selector' /></span>
        <img src={search} />
      </div>
      <div className='clear'></div>
    </section>
  )
}

class ContactInput extends Component {
  render () {
    const {className,contact,locale,selectContact} = this.props
    return (contact ? initContact(contact, locale, selectContact) : contactSelector(className, selectContact))
  }
}

ContactInput.propTypes = {
  contact: PropTypes.object,
  locale: PropTypes.string.isRequired,
  selectContact: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
}

ContactInput.contextTypes = {
  store: React.PropTypes.object.isRequired
}
export default ContactInput


