import { useCookies } from 'react-cookie'
import { atom, useRecoilState } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { Extend } from '@interface/middleWare'
import palette from '@theme/palette'
import { FormatDefaultDate, HandleBeforeMonthDate } from '@utils/utilsFunction'

const themeColor = palette('light')

const { persistAtom } = recoilPersist()

const initState: Extend = {
  dialogExtend: false,
  dialogSize: 'sm',
  menuListExtend: true,
  ctlToken: '',
  userName: '',
  userMail: '',
  userPic: '',
  nonceCheckValue: '',
  notifyCheckString: '',
  loginThirdPartCtlToken: '',
  lineRedirectValue: '/Login',
  notifyCheckValue: true,
  systemConfigObject: {
    webHomePage: '/',
    adminHomePage: '/admin',
    loginLogoLink: '',
    menuLogoLink: '',
    systemName: '',
    systemTitle: '',
    systemDescription: '',
    backgroundImageLink: 'bg-01.jpg',
    sso: {
      google: false,
      line: false,
    },
    isWebDisabled: false,
    jwtExpiresMinutes: 3600,
  },
  redirectRoute: {
    isRedirect: false,
    route: '',
  },
  isChangePwd: false,
  systemFrontMenusOptions: [],
  systemBackMenusOptions: [],
  frontTabMenuOptions: [],
  backTabMenuOptions: [],
  frontTitleArrayOptions: [],
  backTitleArrayOptions: [],
  // enum
  auditStatus: [],
  attendanceStatus: [],
  bulletinStatus: [],
  certificateType: [],
  confirmationStatus: [],
  constructStatus: [],
  dailyTaskStatus: [],
  emergencyType: [],
  emergencyStatus: [],
  feedbackStatus: [],
  iotType: [],
  webFeedbackStatus: [],
  maintenanceStatus: [],
  materialInventoryStatus: [],
  operatorStatus: [],
  packagePickupStatus: [],
  packageSendStatus: [],
  packageTransferStatus: [],
  paymentRecordStatus: [],
  propertyStatus: [],
  scheduleType: [],
  stockStatus: [],
  ticketsType: [],
  ticketStatusType: [],
  visitorType: [],
  itemType: [],
  logisticsType: [],
  transferType: [],
  //
  tabMaxWidth: '100%',
  frontLeftSideMenu: [
    {
      name: '基本功能',
      list: [],
    },
  ],
  backLeftSideMenu: [
    {
      name: '基本功能',
      list: [],
    },
  ],
  timeZone: [
    { id: 'Pacific/Midway', name: 'Midway (UTC-11)' },
    { id: 'Pacific/Honolulu', name: 'Honolulu (UTC-10)' },
    { id: 'Pacific/Gambier', name: 'Gambier Islands (UTC-9)' },
    { id: 'America/Anchorage', name: 'Anchorage (UTC-8)' },
    { id: 'America/Los_Angeles', name: 'Los Angeles (UTC-7)' },
    { id: 'America/Denver', name: 'Denver (UTC-6)' },
    { id: 'America/Chicago', name: 'Chicago (UTC-5)' },
    { id: 'America/New_York', name: 'New York (UTC-4)' },
    { id: 'America/Argentina/Buenos_Aires', name: 'Buenos Aires (UTC-3)' },
    { id: 'America/Noronha', name: 'Fernando de Noronha (UTC-2)' },
    { id: 'Atlantic/Azores', name: 'Azores (UTC-1)' },
    { id: 'Europe/London', name: 'London (UTC+0)' },
    { id: 'Europe/Paris', name: 'Paris (UTC+1)' },
    { id: 'Europe/Moscow', name: 'Moscow (UTC+3)' },
    { id: 'Asia/Dubai', name: 'Dubai (UTC+4)' },
    { id: 'Asia/Karachi', name: 'Karachi (UTC+5)' },
    { id: 'Asia/Dhaka', name: 'Dhaka (UTC+6)' },
    { id: 'Asia/Bangkok', name: 'Bangkok (UTC+7)' },
    { id: 'Asia/Taipei', name: 'Taipei (UTC+8)' },
    { id: 'Asia/Tokyo', name: 'Tokyo (UTC+9)' },
    { id: 'Australia/Sydney', name: 'Sydney (UTC+10)' },
    { id: 'Australia/Adelaide', name: 'Adelaide (UTC+10:30)' },
    { id: 'Australia/Brisbane', name: 'Brisbane (UTC+11)' },
    { id: 'Pacific/Nauru', name: 'Nauru (UTC+12)' },
    { id: 'Pacific/Auckland', name: 'Auckland (UTC+13)' },
    { id: 'Pacific/Chatham', name: 'Chatham Islands (UTC+13:45)' },
  ],
  defaultSystemThemeColor: themeColor.color.PRIMARY_ADMIN,
  dateRangeInitialDate: {
    before: HandleBeforeMonthDate(),
    now: FormatDefaultDate(),
  },
}

// dialog全版面切換
const extendStatus = atom({
  key: 'dialogExtend',
  default: initState.dialogExtend,
  effects_UNSTABLE: [persistAtom],
})

// dialog尺寸切換
const dialogSize = atom({
  key: 'dialogSize',
  default: initState.dialogSize,
  effects_UNSTABLE: [persistAtom],
})

// 第三方登入驗證token
const loginThirdPartCtlToken = atom({
  key: 'loginThirdPartCtlToken',
  default: initState.loginThirdPartCtlToken,
})

// line login check value
const nonceCheckValue = atom({
  key: 'nonceCheckValue',
  default: initState.nonceCheckValue,
  effects_UNSTABLE: [persistAtom],
})

// line notify check value
const notifyCheckString = atom({
  key: 'notifyCheckString',
  default: initState.notifyCheckString,
  effects_UNSTABLE: [persistAtom],
})

// line oauth redirectUri value
const lineRedirectValue = atom({
  key: 'lineRedirectValue',
  default: initState.lineRedirectValue,
  effects_UNSTABLE: [persistAtom],
})

// 推播確認預設
const notifyCheckValue = atom({
  key: 'notifyCheckValue',
  default: initState.notifyCheckValue,
  effects_UNSTABLE: [persistAtom],
})

// 系統參數預設
const systemConfigObject = atom({
  key: 'systemConfigObject',
  default: initState.systemConfigObject,
  effects_UNSTABLE: [persistAtom],
})

// 系統重新導向路由
const redirectRoute = atom({
  key: 'redirectRoute',
  default: initState.redirectRoute,
  effects_UNSTABLE: [persistAtom],
})

// 前台左側選單
const frontLeftSideMenu = atom({
  key: 'frontLeftSideMenu',
  default: initState.frontLeftSideMenu,
  effects_UNSTABLE: [persistAtom],
})

// 後台左側選單
const backLeftSideMenu = atom({
  key: 'backLeftSideMenu',
  default: initState.backLeftSideMenu,
  effects_UNSTABLE: [persistAtom],
})

// 左側選單展開
const menuListExtend = atom({
  key: 'menuListExtend',
  default: initState.menuListExtend,
  effects_UNSTABLE: [persistAtom],
})

// 變更密碼全域判斷
const isChangePwd = atom({
  key: 'isChangePwd',
  default: initState.isChangePwd,
  effects_UNSTABLE: [persistAtom],
})

// 前台系統選單選項組
const systemFrontMenusOptions = atom({
  key: 'systemFrontMenusOptions',
  default: initState.systemFrontMenusOptions,
  effects_UNSTABLE: [persistAtom],
})

// 後台系統選單選項組
const systemBackMenusOptions = atom({
  key: 'systemBackMenusOptions',
  default: initState.systemBackMenusOptions,
  effects_UNSTABLE: [persistAtom],
})

// 前台Tab選單選項組
const frontTabMenuOptions = atom({
  key: 'frontTabMenuOptions',
  default: initState.frontTabMenuOptions,
  effects_UNSTABLE: [persistAtom],
})

// 後台Tab選單選項組
const backTabMenuOptions = atom({
  key: 'backTabMenuOptions',
  default: initState.backTabMenuOptions,
  effects_UNSTABLE: [persistAtom],
})

// 前台麵包屑資料組
const frontTitleArrayOptions = atom({
  key: 'frontTitleArrayOptions',
  default: initState.frontTitleArrayOptions,
  effects_UNSTABLE: [persistAtom],
})

// 後台麵包屑資料組
const backTitleArrayOptions = atom({
  key: 'backTitleArrayOptions',
  default: initState.backTitleArrayOptions,
  effects_UNSTABLE: [persistAtom],
})

const ctlToken = atom({
  key: 'ctlToken',
  default: initState.userName,
  effects_UNSTABLE: [persistAtom],
})

const userName = atom({
  key: 'userName',
  default: initState.userName,
  effects_UNSTABLE: [persistAtom],
})

const userMail = atom({
  key: 'userMail',
  default: initState.userMail,
  effects_UNSTABLE: [persistAtom],
})

const userPic = atom({
  key: 'userPic',
  default: initState.userPic,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const attendanceStatus = atom({
  key: 'attendanceStatus',
  default: initState.attendanceStatus,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const auditStatus = atom({
  key: 'auditStatus',
  default: initState.auditStatus,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const bulletinStatus = atom({
  key: 'bulletinStatus',
  default: initState.bulletinStatus,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const certificateType = atom({
  key: 'certificateType',
  default: initState.certificateType,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const confirmationStatus = atom({
  key: 'confirmationStatus',
  default: initState.confirmationStatus,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const constructStatus = atom({
  key: 'constructStatus',
  default: initState.constructStatus,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const dailyTaskStatus = atom({
  key: 'dailyTaskStatus',
  default: initState.dailyTaskStatus,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const emergencyType = atom({
  key: 'emergencyType',
  default: initState.emergencyType,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const emergencyStatus = atom({
  key: 'emergencyStatus',
  default: initState.emergencyStatus,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const feedbackStatus = atom({
  key: 'feedbackStatus',
  default: initState.feedbackStatus,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const iotType = atom({
  key: 'iotType',
  default: initState.iotType,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const webFeedbackStatus = atom({
  key: 'webFeedbackStatus',
  default: initState.webFeedbackStatus,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const maintenanceStatus = atom({
  key: 'maintenanceStatus',
  default: initState.maintenanceStatus,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const materialInventoryStatus = atom({
  key: 'materialInventoryStatus',
  default: initState.materialInventoryStatus,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const operatorStatus = atom({
  key: 'operatorStatus',
  default: initState.operatorStatus,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const packagePickupStatus = atom({
  key: 'packagePickupStatus',
  default: initState.packagePickupStatus,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const packageSendStatus = atom({
  key: 'packageSendStatus',
  default: initState.packageSendStatus,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const packageTransferStatus = atom({
  key: 'packageTransferStatus',
  default: initState.packageTransferStatus,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const paymentRecordStatus = atom({
  key: 'paymentRecordStatus',
  default: initState.paymentRecordStatus,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const propertyStatus = atom({
  key: 'propertyStatus',
  default: initState.propertyStatus,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const scheduleType = atom({
  key: 'scheduleType',
  default: initState.scheduleType,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const stockStatus = atom({
  key: 'stockStatus',
  default: initState.stockStatus,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const ticketsType = atom({
  key: 'ticketsType',
  default: initState.ticketsType,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const ticketStatusType = atom({
  key: 'ticketStatusType',
  default: initState.ticketStatusType,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const visitorType = atom({
  key: 'visitorType',
  default: initState.visitorType,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const itemType = atom({
  key: 'itemType',
  default: initState.itemType,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const logisticsType = atom({
  key: 'logisticsType',
  default: initState.logisticsType,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const transferType = atom({
  key: 'transferType',
  default: initState.transferType,
  effects_UNSTABLE: [persistAtom],
})

const timeZone = atom({
  key: 'timeZone',
  default: initState.timeZone,
  effects_UNSTABLE: [persistAtom],
})

const tabMaxWidth = atom({
  key: 'tabMaxWidth',
  default: initState.tabMaxWidth,
  effects_UNSTABLE: [persistAtom],
})

const defaultSystemThemeColor = atom({
  key: 'defaultSystemThemeColor',
  default: initState.defaultSystemThemeColor,
})

const dateRangeInitialDate = atom({
  key: 'dateRangeInitialDate',
  default: initState.dateRangeInitialDate,
})

const Middleware = () => {
  // cookie
  // const [tokenCookieState, setTokenState, removeTokenState] = useCookies(['ctlToken'])

  // recoil
  const [extendState, setExtendState] = useRecoilState(extendStatus)
  const [dialogSizeState, setDialogSizeState] = useRecoilState(dialogSize)
  const [menuListOpen, setMenuListOpen] = useRecoilState(menuListExtend)
  const [thirdPartCtlTokenState, setThirdPartCtlTokenState] = useRecoilState(loginThirdPartCtlToken)
  const [nonceCheckValueState, setNoneCheckValueState] = useRecoilState(nonceCheckValue)
  const [notifyCheckStringState, setNotifyCheckStringState] = useRecoilState(notifyCheckString)
  const [lineRedirectState, setLineRedirectState] = useRecoilState(lineRedirectValue)
  const [notifyCheckState, setNotifyCheckState] = useRecoilState(notifyCheckValue)
  const [isChangePwdState, setIsChangePwdState] = useRecoilState(isChangePwd)
  const [tokenState, setTokenState] = useRecoilState(ctlToken)
  const [userNameState, setUserNameState] = useRecoilState(userName)
  const [userMailState, setUserMailState] = useRecoilState(userMail)
  const [userPicState, setUserPic] = useRecoilState(userPic)
  const [systemConfigObjectState, setSystemConfigObject] = useRecoilState(systemConfigObject)
  const [redirectRouteState, setRedirectRouteState] = useRecoilState(redirectRoute)
  const [tabMaxWidthValue, setTabMaxWidthValue] = useRecoilState(tabMaxWidth)
  const [frontLeftSideMenuValue, setFrontLeftSideMenuValue] = useRecoilState(frontLeftSideMenu)
  const [backLeftSideMenuValue, setBackLeftSideMenuValue] = useRecoilState(backLeftSideMenu)
  const [systemFrontMenusOpt, setSystemFrontMenusOpt] = useRecoilState(systemFrontMenusOptions)
  const [systemBackMenusOpt, setSystemBackMenusOpt] = useRecoilState(systemBackMenusOptions)
  const [frontTabMenuOpt, setFrontTabMenuOpt] = useRecoilState(frontTabMenuOptions)
  const [backTabMenuOpt, setBackTabMenuOpt] = useRecoilState(backTabMenuOptions)
  const [frontTittleArrOpt, setFrontTittleArrOpt] = useRecoilState(frontTitleArrayOptions)
  const [backTittleArrOpt, setBackTittleArrOpt] = useRecoilState(backTitleArrayOptions)
  const [timeZoneOptions] = useRecoilState(timeZone)
  const [defaultTheme] = useRecoilState(defaultSystemThemeColor)
  const [dateRangeInitial, setDateRangeInitial] = useRecoilState(dateRangeInitialDate)

  // enum options
  const [attendanceState, setAttendanceState] = useRecoilState(attendanceStatus)
  const [auditState, setAuditState] = useRecoilState(auditStatus)
  const [bulletinState, setBulletinState] = useRecoilState(bulletinStatus)
  const [certificateState, setCertificateState] = useRecoilState(certificateType)
  const [confirmationState, setConfirmationState] = useRecoilState(confirmationStatus)
  const [constructState, setConstructState] = useRecoilState(constructStatus)
  const [dailyTaskState, setDailyTaskState] = useRecoilState(dailyTaskStatus)
  const [emergencyState, setEmergencyState] = useRecoilState(emergencyType)
  const [emergencyStatusState, setEmergencyStatusState] = useRecoilState(emergencyStatus)
  const [feedBackState, setFeedBackState] = useRecoilState(feedbackStatus)
  const [iotState, setIotState] = useRecoilState(iotType)
  const [webFeedBackState, setWebFeedBackState] = useRecoilState(webFeedbackStatus)
  const [maintenanceState, setMaintenanceState] = useRecoilState(maintenanceStatus)
  const [materialInventState, setMaterialInventState] = useRecoilState(materialInventoryStatus)
  const [operatorState, setOperatorState] = useRecoilState(operatorStatus)
  const [packagePickupState, setPackagePickupState] = useRecoilState(packagePickupStatus)
  const [packageSendState, setPackageSendState] = useRecoilState(packageSendStatus)
  const [packageTransferState, setPackageTransferState] = useRecoilState(packageTransferStatus)
  const [paymentRecordState, setPaymentRecordState] = useRecoilState(paymentRecordStatus)
  const [propertyState, setPropertyState] = useRecoilState(propertyStatus)
  const [scheduleState, setScheduleState] = useRecoilState(scheduleType)
  const [stockState, setStockState] = useRecoilState(stockStatus)
  const [ticketsState, setTicketsState] = useRecoilState(ticketsType)
  const [ticketStatusState, setTicketStatusState] = useRecoilState(ticketStatusType)
  const [visitorState, setVisitorState] = useRecoilState(visitorType)
  const [itemTypeOptions, setItemTypeOptions] = useRecoilState(itemType)
  const [logisticsTypeOptions, setLogisticsTypeOptions] = useRecoilState(logisticsType)
  const [transferTypeOptions, setTransferTypeOptions] = useRecoilState(transferType)

  // 登入儲存資料
  const loginStore = (result: {
    ctlToken: string
    userName: string
    email: string
    avatar: string
    isMustChangePwd: boolean
  }) => {
    setTokenState(result.ctlToken)
    setUserNameState(result.userName)
    setUserMailState(result.email)
    setUserPic(result.avatar)
    setIsChangePwdState(result?.isMustChangePwd)
  }

  // 過濾儲存為404的情況
  const filterPathName = (pathname: string): string => {
    // 儲存前台 404 轉前台首頁
    if (pathname?.includes('/web/404')) {
      return '/'
    }
    // 儲存後台 404 轉後台首頁
    if (pathname?.includes('/admin/404')) {
      return '/admin'
    }
    // 原先路徑
    return pathname
  }

  // 登出清空資料
  const logoutStore = (pathname: string) => {
    // removeTokenState('ctlToken')

    setFrontTabMenuOpt([])
    setBackTabMenuOpt([])
    setFrontTittleArrOpt([])
    setBackTittleArrOpt([])
    setTokenState('')
    setUserNameState('')
    setUserMailState('')
    setUserPic('')
    setIsChangePwdState(false)
    setRedirectRouteState({ isRedirect: false, route: filterPathName(pathname) })
  }

  // 報表 date range 起始日期
  const reportStartDateRange = (e: Date | null, startChange: any, endDate: Date | null) => {
    startChange(e)
    setDateRangeInitial({
      before: e,
      now: endDate,
    })
  }

  // 報表 date range 結束日期
  const reportEndDateRange = (e: Date | null, endChange: any, startDate: Date | null) => {
    endChange(e)
    setDateRangeInitial({
      before: startDate,
      now: e,
    })
  }

  // ctlToken check
  // const tokenState = tokenCookieState.ctlToken

  return {
    extendState,
    setExtendState,
    dialogSizeState,
    setDialogSizeState,
    // third part
    thirdPartCtlTokenState,
    setThirdPartCtlTokenState,
    nonceCheckValueState,
    lineRedirectState,
    setLineRedirectState,
    notifyCheckState,
    setNotifyCheckState,
    notifyCheckStringState,
    setNotifyCheckStringState,
    //
    setNoneCheckValueState,
    menuListOpen,
    setMenuListOpen,
    isChangePwdState,
    tokenState,
    userNameState,
    userMailState,
    userPicState,
    setTokenState,
    systemConfigObjectState,
    setSystemConfigObject,
    redirectRouteState,
    setRedirectRouteState,
    loginStore,
    logoutStore,
    // enum
    attendanceState,
    setAttendanceState,
    auditState,
    setAuditState,
    bulletinState,
    setBulletinState,
    certificateState,
    setCertificateState,
    confirmationState,
    setConfirmationState,
    constructState,
    setConstructState,
    dailyTaskState,
    setDailyTaskState,
    emergencyState,
    setEmergencyState,
    emergencyStatusState,
    setEmergencyStatusState,
    feedBackState,
    setFeedBackState,
    iotState,
    setIotState,
    webFeedBackState,
    setWebFeedBackState,
    maintenanceState,
    setMaintenanceState,
    materialInventState,
    setMaterialInventState,
    operatorState,
    setOperatorState,
    packagePickupState,
    setPackagePickupState,
    packageSendState,
    setPackageSendState,
    packageTransferState,
    setPackageTransferState,
    paymentRecordState,
    setPaymentRecordState,
    propertyState,
    setPropertyState,
    scheduleState,
    setScheduleState,
    stockState,
    setStockState,
    ticketsState,
    setTicketsState,
    ticketStatusState,
    setTicketStatusState,
    visitorState,
    setVisitorState,
    itemTypeOptions,
    setItemTypeOptions,
    logisticsTypeOptions,
    setLogisticsTypeOptions,
    transferTypeOptions,
    setTransferTypeOptions,
    //
    timeZoneOptions,
    tabMaxWidthValue,
    setTabMaxWidthValue,
    frontLeftSideMenuValue,
    backLeftSideMenuValue,
    setFrontLeftSideMenuValue,
    setBackLeftSideMenuValue,
    defaultTheme,
    systemFrontMenusOpt,
    setSystemFrontMenusOpt,
    systemBackMenusOpt,
    setSystemBackMenusOpt,
    frontTabMenuOpt,
    setFrontTabMenuOpt,
    backTabMenuOpt,
    setBackTabMenuOpt,
    frontTittleArrOpt,
    setFrontTittleArrOpt,
    backTittleArrOpt,
    setBackTittleArrOpt,
    dateRangeInitial,
    reportEndDateRange,
    reportStartDateRange,
  }
}

export default Middleware
