import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import useAdmin from 'src/service/AdminService'
import useGeneralApi from 'src/service/GeneralAPIService'
import Image from '@components/image'
import useMiddleware from '@hooks/use-middleware'
import { useRouterName, useTitleName } from '@hooks/useRouterAndTitleName'
import AvatarDisplay from '@layout/AvatarDisplay'
import AccountMenu from '@layout/FrontLayout/AccountMenu'
import SideMenuRoute from '@layout/FrontLayout/SideMenuRoute'
import { useLocales } from '@locales/index'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import MenuIcon from '@mui/icons-material/Menu'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Box, Breadcrumbs, Button, CssBaseline, IconButton, Link } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { PUNCH_RECORD } from '@service/APP_Web'
import {
  CusAppBar,
  DrawerHeader,
  Main,
  StyledDrawer,
  StyledToolbar,
} from '@styles/styles_front_layout/mainLayoutStyle'
import { THEME_COLOR } from '@theme/colorManager'

const Copyright = dynamic(() => import('@layout/BackLayout/copyRight'), { ssr: false })

const MainLayout = ({ children }: { children: JSX.Element }): any => {
  const {
    menuListOpen,
    tokenState,
    frontTittleArrOpt,
    systemConfigObjectState,
    setMenuListOpen,
    setExtendState,
    logoutStore,
  } = useMiddleware()
  const router = useRouter()
  const { getListData } = useGeneralApi()
  const { postLogout, getAllUniversalOption } = useAdmin()
  const [mount, setMount] = useState(false)

  // punch
  const [punch, setPunch] = useState(null)
  // 取得個人當日打卡記錄
  const getPersonalPunchRecord = async () => {
    setPunch(null)
    const { status, result } = await getListData(PUNCH_RECORD)
    if (status === 200) {
      setPunch(result)
    }
  }

  // 判斷是否為移動裝置
  const mobileDialog: boolean = useMediaQuery('(max-width:425px)')
  const mobileDrawer: boolean = useMediaQuery('(max-width:600px)')
  // 判斷寬度是否足夠顯示麵包屑
  const show: boolean = useMediaQuery('(min-width:900px)')
  const { titleArray } = useRouterName()
  const { frontTitleName: titleName } = useTitleName()
  // 多國語系
  const { currentLang } = useLocales()

  // 登入後右上側點擊顯示popover彈窗
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const handlePopOverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    getPersonalPunchRecord()
  }
  const handlePopOverClose = () => {
    setAnchorEl(null)
  }
  const popOverOpen = Boolean(anchorEl)
  const popOverId = popOverOpen ? 'simple-popover' : undefined

  const handleExit = () => {
    postLogout()
    router.push('/Login')
  }

  const getAllEnumOptions = async () => await getAllUniversalOption()

  useEffectOnce(() => {
    getAllEnumOptions()
  })

  useEffectOnce(() => {
    setMount(true)
    setExtendState(mobileDialog)
    setMenuListOpen(show)
    if (tokenState === '') {
      handleExit()
    }
  })

  useUpdateEffect(() => {
    setMenuListOpen(show)
  }, [show])

  useUpdateEffect(() => {
    setExtendState(mobileDialog)
  }, [mobileDialog])

  useEffectOnce(() => {
    document.title = titleName()
  })

  useUpdateEffect(() => {
    document.title = titleName()
  }, [router, currentLang])

  return (
    mount && (
      <Box
        sx={{
          display: 'flex',
          // eslint-disable-next-line max-len
          backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH}/images/cover/${systemConfigObjectState?.backgroundImageLink}')`,
        }}
      >
        <CssBaseline />
        <CusAppBar position="fixed" open={menuListOpen}>
          <StyledToolbar variant="dense">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setMenuListOpen(!menuListOpen)}
              edge="start"
            >
              {menuListOpen ? (
                <KeyboardDoubleArrowLeftIcon
                  fontSize="large"
                  sx={{ color: THEME_COLOR.SECONDARY_WEB }}
                />
              ) : (
                <MenuIcon fontSize="large" sx={{ color: THEME_COLOR.SECONDARY_WEB }} />
              )}
            </IconButton>

            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              sx={{
                display: !show ? 'none' : 'default',
                margin: '0',
                padding: '8px 10px',
                fontWeight: 600,
                cursor: 'default',
              }}
            >
              <Link underline="none" color={THEME_COLOR.HEADER_TEXT}>
                {frontTittleArrOpt.map(({ router, name }: { router: string; name: any }) => {
                  if (router === titleArray) {
                    return (
                      <div key={router} style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                        {name[`${currentLang.value}`]}
                      </div>
                    )
                  }
                })}
              </Link>
            </Breadcrumbs>

            <Box sx={{ ml: 'auto' }}>
              <Box
                component="span"
                m={1}
                sx={{ display: 'flex', float: 'right', verticalAlign: 'center' }}
              >
                <Button
                  size="medium"
                  aria-label="delete"
                  onClick={handlePopOverClick}
                  sx={{ backgroundColor: THEME_COLOR.SCROLLBAR.TRACK }}
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  <AvatarDisplay />
                </Button>
                <AccountMenu
                  anchorEl={anchorEl}
                  open={popOverOpen}
                  id={popOverId}
                  handleClose={handlePopOverClose}
                  handlePunch={getPersonalPunchRecord}
                  punch={punch}
                  handleLogout={async () => {
                    logoutStore(router?.asPath)
                    await postLogout()
                    router.push('/Login')
                  }}
                />
              </Box>
            </Box>
          </StyledToolbar>
        </CusAppBar>
        <StyledDrawer variant="persistent" anchor="left" open={menuListOpen}>
          <DrawerHeader
            className="noBoxShadow"
            sx={{ backgroundColor: mobileDrawer ? THEME_COLOR.HEADER_BG_WEB : 'default' }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                alt="login logo"
                src={
                  systemConfigObjectState.menuLogoLink === ''
                    ? '/images/logo/backImg.png'
                    : systemConfigObjectState.menuLogoLink
                }
                style={{
                  maxWidth: '220px',
                  maxHeight: '48px',
                  objectFit: 'contain',
                }}
              />
            </div>
          </DrawerHeader>
          <SideMenuRoute />
          <Box
            sx={{
              marginTop: 'auto',
              justifyContent: 'center',
              backgroundColor: THEME_COLOR.COPYRIGHT_BG,
            }}
          >
            <Copyright />
          </Box>
        </StyledDrawer>
        <Main
          open={menuListOpen}
          sx={{ backgroundColor: THEME_COLOR.SIDE_MENU.MAIN_BG_FILTER_LIST }}
        >
          <DrawerHeader />
          {children}
        </Main>
      </Box>
    )
  )
}

export default MainLayout
