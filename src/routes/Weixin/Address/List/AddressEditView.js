/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import AddressForm from 'components/Address/add/AddressForm'
import {addressDetails,saveOrUpdateAddress} from 'reducers/Address'
import {goBack} from 'react-router-redux'
import {toastr} from 'components/toastr'
import {requireFields, lang,formatCity} from 'common'
import {reduxForm} from 'redux-form'

class AddressEditView extends Component {

  constructor(props, context) {
    super(props, context)
    this.messages = context.intl.messages
    this.locale =  context.intl.locale
  }

  componentDidMount() {
    this.props.addressDetails(this.props.addressId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.addOrEditSuccess && !this.props.addOrEditSuccess) {
       nextProps.goBack()
    }
  }

  render() {
    let {initialValues, isLoading,fields, submitting, handleSubmit} = this.props
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <AddressForm
            data={initialValues}
            fields={fields}
            isLoading={isLoading}
            submitting={submitting}
            locale={this.locale}
          />
        </form>
      </div>
    )
  }
}

AddressEditView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  addressId: PropTypes.string,
  addressDetails: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  initialValues: PropTypes.object,
  addOrEditSuccess : PropTypes.bool.isRequired
}

AddressEditView.contextTypes = {
  intl: React.PropTypes.object.isRequired
}


const mapStateToProps = (state,ownProps) => {
  return {
    addressId:ownProps.params.id,
    isLoading: state.address.isLoading,
    initialValues:ownProps.params.id?{...state.address.detailsData,
       point:state.address.detailsData.point &&
       `${state.address.detailsData.point.lon},${state.address.detailsData.point.lat}`
    }:{city:formatCity('上海')},
    addOrEditSuccess:state.address.addOrEditSuccess
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    addressDetails: function(addressId) {
      if(addressId){
        dispatch(addressDetails(addressId))
      }
    },
    goBack: function(addressId) {
      dispatch(goBack())
    }
  }
}

const validateAdderss = requireFields('name', 'mobile','city','address','point')
const curLang  =lang()
const validate = data => {
  const error = {...validateAdderss(data)}
  if(data.name && data.name.length <= 1){
    error.name = true
  }
  if(curLang === 'zh'){
    if(!data.details || !data.details.detail){
      error.details= {detail:true}
    }
  }
  if (data.mobile && !error.mobile &&
    !(/^(13[0-9]{9}|14[0-9]{9}|15[0-9]{9}|16[0-9]{9}|17[0-9]{9}|18[0-9]{9})$/i.test(data.mobile))) {
    error.mobile = true
  }
  return error
}

const submitForm = (data, dispatch) => {
    dispatch(saveOrUpdateAddress({...data,default:0}))
}

export default reduxForm({
  form: 'addressForm',
  fields:['id', 'name', 'mobile','city','address', 'details.detail','details.room','details.building',
    'details.floor','point','poiId'],
  onSubmit: submitForm,
  validate,
}, mapStateToProps, mapDispatchToProps)(AddressEditView)


