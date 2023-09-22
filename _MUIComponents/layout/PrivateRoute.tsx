import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffectOnce } from 'react-use'
import FullPageLoader from '@components/FullPageLoader'
import useMiddleWare from '@hooks/use-middleware'

const PrivateRoute = ({ children }: { children: JSX.Element }): any => {
  const router = useRouter()
  const { tokenState, isChangePwdState, setRedirectRouteState, systemConfigObjectState } =
    useMiddleWare()
  const [mount, setMount] = useState(false)

  useEffectOnce(() => {
    // 關閉前台 且 無Token 且非後台網址 儲存後台指定頁面
    if (
      systemConfigObjectState?.isWebDisabled &&
      !router?.asPath.includes('/admin') &&
      (tokenState === '' || tokenState === null)
    ) {
      setRedirectRouteState({ isRedirect: true, route: systemConfigObjectState?.adminHomePage })
      router.push('/Login')
      return
    }
    // 無Token 儲存連結頁面
    if (tokenState === '' || tokenState === null) {
      setRedirectRouteState({ isRedirect: true, route: router?.asPath })
      router.push('/Login')
      return
    }
    // 強制變更密碼 轉後台
    if (isChangePwdState && router.pathname.includes('/admin')) {
      router.push('/admin/ChangePassword')
      return
    }
    // 強制變更密碼 轉前台
    if (isChangePwdState) {
      router.push('/web/ChangePassword')
      return
    }
    // 關閉前台 且 如果網址不包含/admin 強制轉址後台 404
    if (systemConfigObjectState?.isWebDisabled && !router.asPath.includes('/admin')) {
      router.push('/admin/404')
      return
    }
    // 無此頁面 轉後台
    if (router?.pathname === '/_error' && router.asPath.includes('/admin')) {
      router.push('/admin/404')
      return
    }
    // 無此頁面 轉前台
    if (router?.pathname === '/_error') {
      router.push('/web/404')
      return
    }
  })

  if (tokenState === '' || tokenState === null) {
    return mount && <FullPageLoader />
  }

  if (isChangePwdState && !router?.pathname?.includes('ChangePassword')) {
    return mount && <FullPageLoader />
  }

  if (router?.pathname === '/_error') {
    return mount && <FullPageLoader />
  }

  return children
}

export default PrivateRoute
