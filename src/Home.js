import React from 'react'
import { Button } from 'antd'
import Authorize from './api/Authorize'
import getGateway from './api/Gateway'
import createWebsocket from './api/Websocket'

export default function Home() {
  const message = 'Welcome to Scrim-Scheduler'
  React.useEffect(() => {
    async function init() {
      const gateway = await getGateway()
      console.log('gateway:',gateway)
      createWebsocket()
    }

    init()
  }, [])
  return (
    <div className='App'>
      <h1>{message}</h1>
      <Button type='primary' onClick={Authorize}> Authorize </Button>
    </div>
  )
}
