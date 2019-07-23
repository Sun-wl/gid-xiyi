/**
 * Created by evan on 2016/2/24.
 */
import React, {Component, PropTypes} from 'react'
import  './assets/ServiceAbout.scss'
import {toastr} from 'components/toastr'
import tipicon  from 'static/img/service/green.png'
import {FormattedMessage as Text} from 'react-intl'



class ServiceIntroduce extends Component {

  constructor(props, context) {
    super(props, context)
    this.messages = context.intl.messages
  }

  render() {
    return (
      <div className="serviceintro">
        <div className="serviceintro-sidrbar"></div>
        <div className="serviceintro-step">
          <p className="serviceintro-steptitle">
            <img src={tipicon} />
            <Text id='service.step1title'/>
          </p>
          <div className="serviceintro-stepcon">
            <p className="serviceintro-stepconhd">
              <Text id='service.step1con'/>
            </p>
            <div className="serviceintro-stepconbd">
              <Text id='service.step1'>
                {(text) =><img src={"/img/service/"+text+".png"} />}
              </Text>
            </div>
          </div>
        </div>
        <div className="serviceintro-step">
          <p className="serviceintro-steptitle">
            <Text id='service.step2title'/>
            <img src={tipicon} />
          </p>
          <div className="serviceintro-stepcon">
            <p className="serviceintro-stepconhd">
              <Text id='service.step2con'/>
            </p>
            <div className="serviceintro-stepconbd">
              <Text id='service.step2'>
                {(text) =><img src={"/img/service/"+text+".png"} />}
              </Text>
            </div>
          </div>
        </div>
        <div className="serviceintro-step">
          <p className="serviceintro-steptitle">
            <Text id='service.step3title'/>
            <img src={tipicon} />
          </p>
          <div className="serviceintro-stepcon">
            <p className="serviceintro-stepconhd">
              <Text id='service.step3con'/>
            </p>
            <div className="serviceintro-stepconbd">
              <Text id='service.step3'>
                {(text) =><img src={"/img/service/"+text+".png"} />}
              </Text>
            </div>
          </div>
        </div>
        <div className="serviceintro-step serviceintro-last">
          <p className="serviceintro-steptitle">
            <Text id='service.step4title'/>
            <img src={tipicon} />
          </p>
          <div className="serviceintro-stepcon">
            <p className="serviceintro-stepconhd">
              <Text id='service.step4con'/>
            </p>
            <div className="serviceintro-stepconbd">
              <Text id='service.step4'>
                {(text) =><img src={`/img/service/${text}.png`} />}
              </Text>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ServiceIntroduce.contextTypes = {
  intl: React.PropTypes.object.isRequired
}

export default ServiceIntroduce
