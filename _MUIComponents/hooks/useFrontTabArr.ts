import { useRouter } from 'next/router'
import useMiddleware from '@hooks/use-middleware'

interface pathObjects {
  pathName: string
  controller: string | null
}

const SwitchPathName = () => {
  const router = useRouter()
  let data = {
    pathName: router.pathname,
    controller: null,
  } as pathObjects

  // 例外 - 物料
  if (data.pathName.indexOf('MaterialPurchasesDetail') > -1) {
    data.pathName = '/web/MaterialManagement'
    data.controller = 'MaterialPurchases'
  }

  if (data.pathName.indexOf('MaterialRequisitionsDetail') > -1) {
    data.pathName = '/web/MaterialManagement'
    data.controller = 'MaterialRequisitions'
  }

  if (data.pathName.indexOf('MaterialRestocksDetail') > -1) {
    data.pathName = '/web/MaterialManagement'
    data.controller = 'MaterialRestocks'
  }

  if (data.pathName.indexOf('MaterialInventoriesDetail') > -1) {
    data.pathName = '/web/MaterialManagement'
    data.controller = 'MaterialInventories'
  }

  // 例外 - 設備
  if (data.pathName.indexOf('RepairsDetail') > -1) {
    data.pathName = '/web/Repairs'
    data.controller = 'RepairTickets'
  }

  if (data.pathName.indexOf('MaintainDetail') > -1) {
    data.pathName = '/web/Repairs'
    data.controller = 'Maintenances'
  }

  // 例外 - 清潔
  if (data.pathName.indexOf('CleansDetail') > -1) {
    data.pathName = '/web/Cleans'
    data.controller = 'CleanTickets'
  }

  // 例外 - 保全
  if (data.pathName.indexOf('GuardsDetail') > -1) {
    data.pathName = '/web/Guards'
    data.controller = 'GuardTickets'
  }

  data.pathName = data.pathName.replace('Detail', '')

  return data
}

const useFrontTabArr = () => {
  const { frontTabMenuOpt } = useMiddleware()
  const pathObjects = SwitchPathName()
  const pathName = pathObjects.pathName
  const newTabArr =
    frontTabMenuOpt.length > 0
      ? frontTabMenuOpt.filter((tab: { router: string }) => `/${tab.router}` === `${pathName}`)[0]
          ?.systemMenuData ?? []
      : []

  const newPluginsTabArr =
    frontTabMenuOpt.length > 0
      ? frontTabMenuOpt.filter((tab: { router: string }) => `/${tab.router}` === `${pathName}`)[0]
          ?.pluginData
      : []
  let newActionSet
  if (pathObjects.controller !== null) {
    newActionSet = newTabArr.find((f: any) => f.controller === pathObjects.controller)?.actionSet
  } else {
    newActionSet = newTabArr?.length > 0 ? newTabArr[0]?.actionSet : []
  }
  const newPluginActionSet = newPluginsTabArr?.actionSet
  const newPluginName = newPluginsTabArr?.name

  return { newTabArr, newActionSet, newPluginActionSet, newPluginName }
}

export default useFrontTabArr
