import React from 'react'
import { Button } from 'antd'
import Authorize from './api/Authorize'

export default function Home() {
  const message = 'Welcome to Scrim-Scheduler'

  return (
    <div className='App'>
      <h1>{message}</h1>
      <Button type='primary' onClick={Authorize}> Authorize </Button>
    </div>
  )
}
