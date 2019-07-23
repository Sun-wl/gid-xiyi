/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import AddressShowListItem from 'components/Address/list/AddressShowListItem'
import {addressList,deleteAddress} from 'reducers/Address'
import {connect} from 'react-redux'
import {toastr} from 'components/toastr'
import addImg from 'static/img/add_address.png'
import {Link} from 'react-router'

class AddressShowListView extends Component {

  constructor(props, context) {
    super(props, context)
    this.messages = context.intl.messages
    this.locale =  context.intl.locale
  }

  componentDidMount() {
    this.props.addressList()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.delSuccess && !this.props.delSuccess) {
      this.props.addressList()
    }
  }

  deleteAddress(id) {

    toastr.tips('address.delete', {
      onCancel: () => {
      },
      onOk: () => this.props.deleteAddress(id),
      cancelText: 'cancel',
      title: ''
    })


  }

  render() {
    let {data, isLoading} = this.props

    return (
      <div>
        <AddressShowListItem
          data={data}
          locale={this.locale}
          deleteAddress={::this.deleteAddress}
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

AddressShowListView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  addressList: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  deleteAddress: PropTypes.func.isRequired,
  delSuccess: PropTypes.bool.isRequired
}

AddressShowListView.contextTypes = {
  intl: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.address.isLoading || false,
    data: state.address.data || [],
    delSuccess: state.address.delSuccess
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    addressList: function () {
      dispatch(addressList())
    },
    deleteAddress: function (id) {
      dispatch(deleteAddress(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressShowListView)
