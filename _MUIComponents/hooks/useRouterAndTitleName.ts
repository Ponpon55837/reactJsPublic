import { useRouter } from 'next/router'
import useMiddleware from '@hooks/use-middleware'
import { useLocales } from '@locales/index'

export const useRouterName = () => {
  const router = useRouter()
  // 麵包屑名稱
  const titleArray = router.pathname.replace('/', '')
  // 多國語系title使用
  const path = router.pathname.replace('/', '')
  return { titleArray, path }
}

export const useTitleName = () => {
  const { backTittleArrOpt, frontTittleArrOpt, systemConfigObjectState } = useMiddleware()
  const { path } = useRouterName()
  const { currentLang } = useLocales()

  // 回傳陣列，因為 currentLang.value 型別可能為 undefined 所以用 name any
  const returnFindRouteNameArr = (optionArr: Array<{ router: string; name: any }>) => {
    let findRouteName =
      optionArr.find((f: { router: string; name: any }) => f.router === `${path}`)?.name ?? ''
    if (findRouteName[`${currentLang.value}`] === undefined) {
      return `${systemConfigObjectState?.systemName}`
    }
    return `${findRouteName[`${currentLang.value}`]} ‧ ${systemConfigObjectState?.systemName}`
  }

  // 後台 Layout 和個人化設定
  const backTitleName = () => returnFindRouteNameArr(backTittleArrOpt)
  // 前台 Layout 和個人化設定
  const frontTitleName = () => returnFindRouteNameArr(frontTittleArrOpt)

  return { backTitleName, frontTitleName }
}
