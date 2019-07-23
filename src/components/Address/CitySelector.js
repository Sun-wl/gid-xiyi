import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import {FormattedMessage as Text} from 'react-intl'
import {CITY_LIST,formatCity} from 'common'
import _ from 'lodash'
import {toastr} from 'components/toastr'


const cityList = (locale, chooseCityItem, selected) => {

  const citys = _.keys(CITY_LIST)
  return (
    _.map(citys, key=>(
      <div className={classnames({'item':true,'choose':(selected.value == CITY_LIST[key])})}
           onClick={() => chooseCityItem(CITY_LIST[key])} name={CITY_LIST[key]}
           key={key}>{locale === 'en' ? key : CITY_LIST[key]}</div>
    ))
  )
}

class CitySelector extends Component {

  constructor(props, context) {
    super(props, context)
    this.locale = context.intl.locale
    this.state = {
      hiddenCityPanel: true
    }
  }

  cityPanel(e) {
    this.setState({'hiddenCityPanel': false})
    this.props.city.onFocus(e)
    toastr.showOverlay()
  }

  chooseCityItem(cityName) {
    const {switchCity} = this.props
    this.props.city.onChange(cityName)
    if (switchCity) {
      switchCity(cityEl.getAttribute('name'))
    }
  }

  confirmCityPanel() {
    this.setState({hiddenCityPanel: true})
    toastr.hideOverlay();
  }

  render() {
    const {city} = this.props
    let element = (
      <Text id='order.from.city.hint'>
        {(text) =>
          <input className="normal" autoComplete="off"  {...city} onFocus={::this.cityPanel}/>
        }
      </Text>
    )
    if (this.state.hiddenCityPanel) {
      return element
    } else {
      return (
        <div>
          {element}
          <div>
            <div className="city-select">
              <div className="title">
                <div className="float-l" onClick={::this.confirmCityPanel}><Text id="cancel"/></div>
                <span className="name"><Text id="choose.city"/></span>
                <div className="float-r lvs" onClick={::this.confirmCityPanel}><Text id="done"/></div>
              </div>
              <div className="list">
                {cityList(this.locale, ::this.chooseCityItem, city)}
                <div className="clear"></div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

CitySelector.propTypes = {
  city: PropTypes.object.isRequired,
  switchCity: PropTypes.func,
  chooseCityItem: PropTypes.func
}

CitySelector.contextTypes = {
  intl: React.PropTypes.object.isRequired
}

export default CitySelector
