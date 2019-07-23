/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import AddressListItem from 'components/Address/list/AddressListItem'
import {addressList} from 'reducers/Address'
import {selectContact} from 'reducers/Order/Add'
import {connect} from 'react-redux'
import {goBack} from 'react-router-redux'
import {Link} from 'react-router'
import addImg from 'static/img/add_address.png'

class AddressListView extends Component {

  constructor(props, context) {
    super(props, context)
    this.messages = context.intl.messages
    this.locale =  context.intl.locale
  }

  componentDidMount() {
    this.props.addressList()
  }

  selectedAddress(address) {
    if(this.props.selectedAddress){
      this.props.selectedAddress(address)
    }
  }

  render() {
    let {data, selected, isLoading} = this.props
    if(!this.props.selected){
      selected = {}
    }
    return (
      <div>
        <AddressListItem
          data={data}
          selectedAddress={::this.selectedAddress}
          selected={selected}
          locale={this.locale}
          isLoading={isLoading}/>

        <div className="address-add">
          <Link to={`/contact/add`}>
            <img src={addImg} width="60px"/>
          </Link>
        </div>
      </div>
    )
  }
}

AddressListView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  addressList: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  selectedAddress: PropTypes.func.isRequired,
  selected: PropTypes.object
}

AddressListView.contextTypes = {
  intl: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.address.isLoading,
    data: state.address.data,
    selected: (state.orderAdd ||{}).selectedContact
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    addressList: function () {
      dispatch(addressList())
    },
    selectedAddress:(address)=>{
       dispatch(selectContact(address))
       dispatch(goBack())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressListView)
