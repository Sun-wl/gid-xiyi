/**
 * Created by evan on 2016/5/12.
 */
import  {formatCity} from 'common'

export default class MapAdapt {

  constructor(city, locale) {
    this.city = formatCity(city,'zh')
    this.locale = locale
    this.initMap(city, locale)
  }

  initMap(city, locale) {
    city = formatCity(city,'zh')
    const _self = this
    if (_self.autoComplete) {
      return
    }
    if (typeof AMap !== 'undefined' && typeof AMap.service === 'function') {
      AMap.service(["AMap.PlaceSearch"], function () {
        _self.autoComplete = new AMap.PlaceSearch(
          {
            citylimit: true,
            pageSize: 6,
            pageIndex: 1,
            city: city,
            lang: locale
          })
      })
    }
  }

  setLang(locale) {
    if (this.autoComplete) {
      this.autoComplete.setLang(locale)
    } else {
      this.initMap(this.city, locale)
    }
  }

  setCity(city) {
    if (this.autoComplete) {
      city = formatCity(city,'zh')
      this.autoComplete.setCity(city)
    } else {
      this.initMap(city, this.locale)
    }
  }

  search(text, callback) {
    if (this.autoComplete) {
      this.autoComplete.search(text, callback)
    } else {
      this.initMap(this.city, this.locale)
    }
  }
}
