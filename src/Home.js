import React from 'react'
import { Button } from 'antd'
import Authorize from './api/Authorize'
import { getGateway } from './api/Gateway'
import createWebsocket from './api/Websocket'

export default function Home() {
  const message = 'Welcome to Scrim-Scheduler'

  return (
    <div className='App'>
      <h1>{message}</h1>
      <Button type='primary' onClick={Authorize}> Authorize </Button>
      <Button type='primary' onClick={getGateway}> Get Gateway </Button>
      <Button type='primary' onClick={createWebsocket}> Create Websocket </Button>
    </div>
  )
}
