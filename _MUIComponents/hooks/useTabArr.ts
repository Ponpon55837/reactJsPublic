import { useRouter } from 'next/router'
import { useEffectOnce } from 'react-use'
import useMiddleware from '@hooks/use-middleware'

const useTabArr = () => {
  const { backTabMenuOpt } = useMiddleware()

  const router = useRouter()
  const pathName = router.pathname

  const newTabArr =
    backTabMenuOpt.length > 0
      ? backTabMenuOpt.filter((tab: { router: string }) => `/${tab.router}` === `${pathName}`)[0]
          ?.systemMenuData ?? []
      : []

  const newPluginsTabArr =
    backTabMenuOpt.length > 0
      ? backTabMenuOpt.filter((tab: { router: string }) => `/${tab.router}` === `${pathName}`)[0]
          ?.pluginData
      : []

  const newActionSet = newTabArr?.length > 0 ? newTabArr[0]?.actionSet : []
  const newPluginActionSet = newPluginsTabArr?.actionSet
  const newPluginName = newPluginsTabArr?.name
  const newSelectActionSet = (route: string) => {
    if (newTabArr.length > 0) {
      return newTabArr.find((f: { controller: string }) => f.controller === route)?.actionSet
    }
    return []
  }

  return { newTabArr, newActionSet, newPluginActionSet, newPluginName, newSelectActionSet }
}

export default useTabArr
