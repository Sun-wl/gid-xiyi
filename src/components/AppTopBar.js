/**
 * Created by evan on 2016/2/24.
 */

import React, {PropTypes} from 'react'
import { FormattedMessage as Text} from 'react-intl'
import arrowLeft from 'static/img/arrow_left.png'

const AppTopBar = ({title}) => {
  if(window.gNavigationBar){
    return (<div/> )
  }else {
    return (
      <div className='topBar'>
        <div onClick={window.gBack}>
          <img src={arrowLeft} />
        </div>
        {<Text id={title} defaultMessage={title}/>}
      </div>
    )
  }
}

AppTopBar.propTypes = {
  title: PropTypes.string.isRequired
}

export default AppTopBar
