export interface Extend {
  dialogExtend: boolean
  dialogSize: string
  menuListExtend: boolean
  ctlToken: string
  userName: string
  userMail: string
  isChangePwd: boolean
  propertyStatus: { id: number; name: string }[]
  certificateType: { id: number; name: string }[]
  tabMaxWidth: string | number
  leftSideMenu: Array<{ name: string; list: [] }>
}
