import { useEffectOnce, useUpdateEffect } from 'react-use'
import { atom, useRecoilState } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { Extend } from '@interface/middleWare'

const { persistAtom } = recoilPersist()

const initState: Extend = {
  dialogExtend: false,
  dialogSize: 'sm',
  menuListExtend: true,
  ctlToken: '',
  userName: '',
  userMail: '',
  isChangePwd: false,
  propertyStatus: [],
  certificateType: [],
  tabMaxWidth: '100%',
  leftSideMenu: [
    {
      name: '基本功能',
      list: [],
    },
  ],
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

// 左側選單展開
const leftSideMenu = atom({
  key: 'leftSideMenu',
  default: initState.leftSideMenu,
  effects_UNSTABLE: [persistAtom],
})

// 左側選單展開
const menuListExtend = atom({
  key: 'menuListExtend',
  default: initState.menuListExtend,
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

// 判斷使用者是否強制要變更密碼
const isChangePwd = atom({
  key: 'isChangePwd',
  default: initState.isChangePwd,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const propertyStatus = atom({
  key: 'propertyStatus',
  default: initState.propertyStatus,
  effects_UNSTABLE: [persistAtom],
})

// enum options
const certificateType = atom({
  key: 'certificateType',
  default: initState.certificateType,
  effects_UNSTABLE: [persistAtom],
})

const tabMaxWidth = atom({
  key: 'tabMaxWidth',
  default: initState.tabMaxWidth,
  effects_UNSTABLE: [persistAtom],
})

const Middleware = () => {
  const [extendState, setExtendState] = useRecoilState(extendStatus)
  const [dialogSizeState, setDialogSizeState] = useRecoilState(dialogSize)
  const [menuListOpen, setMenuListOpen] = useRecoilState(menuListExtend)
  const [tokenState, setTokenState] = useRecoilState(ctlToken)
  const [userNameState, setUserNameState] = useRecoilState(userName)
  const [userMailState, setUserMailState] = useRecoilState(userMail)
  const [isChangePwdState, setIsChangePwdState] = useRecoilState(isChangePwd)
  const [tabMaxWidthValue, setTabMaxWidthValue] = useRecoilState(tabMaxWidth)
  const [leftSideMenuValue, setLeftSideMenuValue] = useRecoilState(leftSideMenu)

  // enum options
  const [propertyState, setPropertyState] = useRecoilState(propertyStatus)
  const [certificateState, setCertificateState] = useRecoilState(certificateType)

  // 登入儲存資料
  const loginStore = (result: {
    ctlToken: string
    userName: string
    email: string
    isChangePwd: boolean
  }) => {
    setTokenState(result.ctlToken)
    setUserNameState(result.userName)
    setUserMailState(result.email)
    setIsChangePwdState(result.isChangePwd)
  }

  // 登出清空資料
  const logoutStore = () => {
    setTokenState('')
    setUserNameState('')
    setUserMailState('')
    setIsChangePwdState(false)
  }

  useEffectOnce(() => {
    if (isChangePwdState) {
      setMenuListOpen(false)
    }
  })

  useUpdateEffect(() => {
    if (isChangePwdState) {
      setMenuListOpen(false)
    }
  }, [isChangePwdState])

  return {
    extendState,
    setExtendState,
    dialogSizeState,
    setDialogSizeState,
    menuListOpen,
    setMenuListOpen,
    tokenState,
    userNameState,
    userMailState,
    setTokenState,
    loginStore,
    logoutStore,
    propertyState,
    setPropertyState,
    certificateState,
    setCertificateState,
    tabMaxWidthValue,
    setTabMaxWidthValue,
    leftSideMenuValue,
    setLeftSideMenuValue,
  }
}

export default Middleware
