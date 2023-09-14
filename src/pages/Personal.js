import React, { useEffect, useState } from 'react'
import { AuthenticationClient, useGuard, User } from '@authing/guard-react18'

export default function Personal() {
  const [userInfo, setUserInfo] = useState('')

  const guard = useGuard()

  useEffect(() => {
    guard.trackSession().then((res: User | null) => {
      console.log('trackSession res: ', res)
      setUserInfo(JSON.stringify(res, null, 2))
    })
  }, [])

  const onLogout = () => guard.logout()

  const updateProfile = async () => {
    const authenticationClient: AuthenticationClient = await guard.getAuthClient()

    const userProfile: User = await authenticationClient.updateProfile({
      nickname: 'Nick'
    })

    console.log('userProfile: ', userProfile)

  }

  return (
    <div>
      <div>
        <button className='authing-button' onClick={onLogout}>登出</button>
        <button className='authing-button' onClick={updateProfile}>Update Profile</button>
      </div>
      {userInfo && (
        <div>
          <div>用户信息：</div>
          <textarea cols={100} rows={30} defaultValue={userInfo}></textarea>
        </div>
      )}
    </div>
  )
}