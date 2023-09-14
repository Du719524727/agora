import React from 'react'

import { useGuard } from '@authing/guard-react18'

export default function TestGuard4 () {
  const guard = useGuard()

  guard.start('#authing-guard-container').then(userInfo => {
    console.log('userInfo: ', userInfo)
  })

  return <>
    <div id="authing-guard-container"></div>
  </>
}