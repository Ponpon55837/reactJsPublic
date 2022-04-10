import { atom, useRecoilState } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

const depart = atom({
  key: 'depart',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

const area = atom({
  key: 'area',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

const floor = atom({
  key: 'floor',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

const channel = atom({
  key: 'channel',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

const cardType = atom({
  key: 'cardType',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

const administrator = atom({
  key: 'administrator',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

const itemType = atom({
  key: 'itemType',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

const logisticsType = atom({
  key: 'logisticsType',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

const diffType = atom({
  key: 'diffType',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

const repairType = atom({
  key: 'repairType',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

const transferType = atom({
  key: 'transferType',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

const scheduleType = atom({
  key: 'scheduleType',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

const certificateType = atom({
  key: 'certificateType',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

const foodType = atom({
  key: 'foodType',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

const Middleware = () => {
  const [departOptions, setDepartOptions] = useRecoilState(depart)

  const [areaOptions, setAreaOptions] = useRecoilState(area)

  const [floorOptions, setFloorOptions] = useRecoilState(floor)

  const [channelOptions, setChannelOptions] = useRecoilState(channel)

  const [cardTypeOptions, setCardTypeOptions] = useRecoilState(cardType)

  const [administratorOptions, setAdministratorOptions] = useRecoilState(administrator)

  const [itemTypeOptions, setItemTypeOptions] = useRecoilState(itemType)

  const [logisticsTypeOptions, setLogisticsTypeOptions] = useRecoilState(logisticsType)

  const [diffTypeOptions, setDiffTypeOptions] = useRecoilState(diffType)

  const [repairTypeOptions, setRepairTypeOptions] = useRecoilState(repairType)

  const [transferTypeOptions, setTransferTypeOptions] = useRecoilState(transferType)

  const [scheduleTypeOptions, setScheduleTypeOptions] = useRecoilState(scheduleType)

  const [certificateTypeOptions, setCertificateTypeOptions] = useRecoilState(certificateType)

  const [foodTypeOptions, setFoodTypeOptions] = useRecoilState(foodType)

  return {
    departOptions,
    setDepartOptions,
    areaOptions,
    setAreaOptions,
    floorOptions,
    setFloorOptions,
    channelOptions,
    setChannelOptions,
    cardTypeOptions,
    setCardTypeOptions,
    administratorOptions,
    setAdministratorOptions,
    itemTypeOptions,
    setItemTypeOptions,
    logisticsTypeOptions,
    setLogisticsTypeOptions,
    diffTypeOptions,
    setDiffTypeOptions,
    repairTypeOptions,
    setRepairTypeOptions,
    transferTypeOptions,
    setTransferTypeOptions,
    scheduleTypeOptions,
    setScheduleTypeOptions,
    certificateTypeOptions,
    setCertificateTypeOptions,
    foodTypeOptions,
    setFoodTypeOptions,
  }
}

export default Middleware
