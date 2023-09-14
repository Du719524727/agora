import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { JwtTokenStatus, useGuard, User } from '@authing/guard-react18'

export default function Callback() {
  const history = useHistory()
  const guard = useGuard()

  const handleCallback = async () => {
    try {

      await guard.handleRedirectCallback()

      const loginStatus: JwtTokenStatus | undefined  = await guard.checkLoginStatus()

      if (!loginStatus) {
        return console.error('Guard is not get login status')
      }

      const userInfo: User | null = await guard.trackSession()

      console.log(userInfo)
      history.replace('/personal')
    } catch (e) {
      console.error('Guard handleAuthingLoginCallback error: ', e)
    }
  }

  useEffect(() => {
    handleCallback()
  })

  return <div>This is Callback page</div>
}