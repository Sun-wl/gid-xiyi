/**
 * Created by evan on 2016/2/24.
 */

import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'

export default createDevTools(
  <LogMonitor />
)
