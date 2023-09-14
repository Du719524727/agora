import React, { useEffect, useState } from 'react'

import { AuthenticationClient, RefreshToken, useGuard, User } from '@authing/guard-react18'

export default function Embed() {
  const [langCache, setLangCache] = useState('')
  const guard = useGuard()

  console.log('guard instance: ', guard)

  const trackSession = async () => {
    const userInfo = await guard.trackSession()
    console.log('userInfo by trackSession: ', userInfo)
  }

  useEffect(() => {
    trackSession()

    guard.start('#authing-guard-container').then((userInfo: User) => {
      console.log('userInfo: ', userInfo)
    })

    guard.on('load', ()=>{

      const langCache = localStorage.getItem('_guard_i18nextLng') || 'zh-CN'
      setLangCache(langCache)
    })

    guard.on('login', (userInfo: User) => {
      console.log('userInfo in login: ', userInfo)
    })

    guard.on('after-change-module', (options) => {
      console.log('after change module options: ', options)

      console.log('guard.getCurrentView: ', guard.getCurrentView())
    })

    guard.on('login-error', error => {
      console.log('login error: ', error)
    })
  }, [])

  const changeLang = (event: any) => {
    guard.changeLang(event.target.value)
    setLangCache(event.target.value)
  }

  const changeContentCSS = () => guard.changeContentCSS(`
    body {
      background-color: red;
    }
  `)

  const startRegister = () => guard.startRegister()

  const logout = () => guard.logout({
    quitCurrentDevice: true 
  })

  const getUserInfo = async () => {
    const userInfo: User | null = await guard.trackSession()
    console.log('userInfo: ', userInfo)
  }

  const refreshToken = async () => {
    const authenticationClient: AuthenticationClient = await guard.getAuthClient()
    const refreshedToken: RefreshToken = await authenticationClient.refreshToken()
    console.log('refreshedToken: ', refreshedToken)
  }

  const checkAllAgreements = () => {
    guard.checkAllAgreements()
  }

  const unCheckAllAgreements = () => {
    guard.unCheckAllAgreements()
  }

  const changeViewToForgetPassword = () => {
    guard.changeView({
      module: 'forgetPassword'
    })
  }

  const changeViewToPassword = () => {
    guard.changeView({
      module: 'login',
      tab: 'password'
    })
  }

  const changeViewToPhoneCode = () => {
    guard.changeView('login:phone-code')
  }

  const changeViewToRegister_UserName = () => {
    guard.changeView('register:username-password')
  }

  const changeViewToRegister_EmailPassword = () => {
    guard.changeView({
      module: 'register',
      tab: 'email-password'
    })
  }

  const changeViewToAppQrcode = () => {
    guard.changeView('login:app-qrcode')
  }

  return <div>
    <select value={langCache} onChange={changeLang}>
      <option value="zh-CN">zh-CN</option>
      <option value="zh-TW">zh-TW</option>
      <option value="en-US">en-US</option>
      <option value="ja-JP">ja-JP</option>
    </select>

    <button className='authing-button' onClick={changeContentCSS}>Change Content CSS</button>

    <button className='authing-button' onClick={startRegister}>Start Register</button>

    <button className='authing-button' onClick={logout}>Logout</button>

    <button className='authing-button' onClick={getUserInfo}>Get User Info</button>

    <button className='authing-button' onClick={refreshToken}>Refresh Token</button>

    <button className='authing-button' onClick={checkAllAgreements}>Check All Agreements</button>

    <button className='authing-button' onClick={unCheckAllAgreements}>Uncheck All Agreements</button>

    <button className='authing-button' onClick={changeViewToPassword}>Change View to Password</button>

    <button className='authing-button' onClick={changeViewToPhoneCode}>Change View to PhoneCode</button>

    <button className='authing-button' onClick={changeViewToForgetPassword}>Change View to ForgetPassword</button>

    <button className='authing-button' onClick={changeViewToAppQrcode}>Change View to AppQrcode</button>

    <button className='authing-button' onClick={changeViewToRegister_UserName}>Change View To Register - UserName</button>

    <button className='authing-button' onClick={changeViewToRegister_EmailPassword}>Change View To Register - EmailPassword</button>

    <div id="authing-guard-container"></div>
  </div>
}