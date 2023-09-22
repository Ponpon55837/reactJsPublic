export interface Extend {
  dialogExtend: boolean
  dialogSize: string
  menuListExtend: boolean
  isChangePwd: boolean
  ctlToken: string
  userName: string
  userMail: string
  userPic: string
  nonceCheckValue: string
  notifyCheckString: string
  loginThirdPartCtlToken: string
  lineRedirectValue: string
  notifyCheckValue: boolean
  systemConfigObject: {
    webHomePage: string
    adminHomePage: string
    loginLogoLink: string
    menuLogoLink: string
    systemName: string
    systemTitle: string
    systemDescription: string
    backgroundImageLink: string
    jwtExpiresMinutes: number
    isWebDisabled: boolean
    sso: {
      google: boolean
      line: boolean
    }
  }
  redirectRoute: {
    isRedirect: boolean
    route: string
  }
  systemFrontMenusOptions: Array<{ id: string; name: string }>
  systemBackMenusOptions: Array<{ id: string; name: string }>
  frontTabMenuOptions: Array<{ actionSet: string[]; controller: string; name: string }>
  backTabMenuOptions: Array<{ actionSet: string[]; controller: string; name: string }>
  frontTitleArrayOptions: Array<{ router: string; name: string }>
  backTitleArrayOptions: Array<{ router: string; name: string }>

  // enum
  auditStatus: Array<{ id: number; name: string }>
  attendanceStatus: Array<{ id: number; name: string }>
  bulletinStatus: Array<{ id: number; name: string }>
  certificateType: Array<{ id: number; name: string }>
  confirmationStatus: Array<{ id: number; name: string }>
  constructStatus: Array<{ id: number; name: string }>
  dailyTaskStatus: Array<{ id: number; name: string }>
  emergencyType: Array<{ id: number; name: string }>
  emergencyStatus: Array<{ id: number; name: string }>
  feedbackStatus: Array<{ id: number; name: string }>
  iotType: Array<{ id: number; name: string }>
  webFeedbackStatus: Array<{ id: number; name: string }>
  maintenanceStatus: Array<{ id: number; name: string }>
  materialInventoryStatus: Array<{ id: number; name: string }>
  operatorStatus: Array<{ id: number; name: string }>
  packagePickupStatus: Array<{ id: number; name: string }>
  packageSendStatus: Array<{ id: number; name: string }>
  packageTransferStatus: Array<{ id: number; name: string }>
  paymentRecordStatus: Array<{ id: number; name: string }>
  propertyStatus: Array<{ id: number; name: string }>
  scheduleType: Array<{ id: number; name: string }>
  stockStatus: Array<{ id: number; name: string }>
  ticketsType: Array<{ id: number; name: string }>
  ticketStatusType: Array<{ id: number; name: string }>
  visitorType: Array<{ id: number; name: string }>
  itemType: Array<{ id: number; name: string }>
  logisticsType: Array<{ id: number; name: string }>
  transferType: Array<{ id: number; name: string }>
  //
  timeZone: Array<{ id: string; name: string }>
  tabMaxWidth: string | number
  frontLeftSideMenu: Array<{ name: string; list: [] }>
  backLeftSideMenu: Array<{ name: string; list: [] }>
  defaultSystemThemeColor: string
  dateRangeInitialDate: {
    before: Date | null
    now: Date | null
  }
}
