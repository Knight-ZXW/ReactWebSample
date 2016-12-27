/**
 * Created by nimdanoob on 2016/12/27.
 */
import React from  'react'
import {createDevTools} from 'redux-devtools'
import  DockMonitor from 'redux-devtools-dock-monitor'
import LogMonitor from 'redux-devtools-log-monitor'

export default createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'>
    <LogMonitor />
  </DockMonitor>
)
