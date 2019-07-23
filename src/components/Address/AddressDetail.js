
import React, {Component, PropTypes} from 'react'
import { FormattedMessage as Text } from 'react-intl'
import classnames from 'classnames'
import {toastr} from 'components/toastr'

class AddressDetail extends Component {

  constructor (props, context) {
    super(props, context)
    this.lang = context.intl.locale
    this.state = {oldValue:'', focus:false}
  }

  detailsOnBlur(e){
    const details = this.props.details
    if(this.state.focus){
      this.setState({focus:false})
    }
    details.detail.onBlur(e)
  }

  render() {
    const details = this.props.details
    const self = this
    if(this.lang === 'en'){
      return(
        <div>
          <span>Rm</span>
          <input type="text"  className="detials-input" {...details.room} placeholder="208"/>
          <span>F</span>
          <input type="text"  className="detials-input" {...details.floor} placeholder="2" />
          <span>Bldg</span>
          <input type="text"  className="detials-input" {...details.building} placeholder="#6" />
        </div>
      )
     }else{
      return (
        <Text id='order.from.address.details.hint'>
          {(text) =>
            <textarea autoComplete="off"
            ref={function(input) {
              if (input != null && details.detail.value && self.state.oldValue !== details.detail.value) {
                  const details = self.props.details
                  if(!self.state.focus){
                    toastr.info("请补充详细地址")
                    self.setState({oldValue:details.detail.value,focus:true})
                  }
                 input.focus()
               }
              }
            }
            className={classnames('address-from-textarea',{'error':details.detail.error && details.detail.touched})}
            {...details.detail}
            placeholder={text}
            onBlur={::this.detailsOnBlur}/>
          }
        </Text>
      )
    }
  }
}

AddressDetail.contextTypes = {
  intl: React.PropTypes.object.isRequired
}

AddressDetail.propTypes ={
  details: PropTypes.object.isRequired
}


export default  AddressDetail
