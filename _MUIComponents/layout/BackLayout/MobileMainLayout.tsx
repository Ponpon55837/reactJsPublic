import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import useAdmin from 'src/service/AdminService'
import Image from '@components/image'
import useMiddleware from '@hooks/use-middleware'
import { useRouterName, useTitleName } from '@hooks/useRouterAndTitleName'
import AvatarDisplay from '@layout/AvatarDisplay'
import AccountMenu from '@layout/BackLayout/AccountMenu'
import SideMenuRoute from '@layout/BackLayout/SideMenuRoute'
import { useLocales } from '@locales/index'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import MenuIcon from '@mui/icons-material/Menu'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Box, Breadcrumbs, Button, CssBaseline, IconButton, Link } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import {
  DrawerHeader,
  MobileCusAppBar,
  MobileMain,
  StyledDrawer,
  StyledToolbar,
} from '@styles/styles_back_layout/mainLayoutStyle'
import { THEME_COLOR } from '@theme/colorManager'

const Copyright = dynamic(() => import('@layout/BackLayout/copyRight'), { ssr: false })

const MobileMainLayout = ({ children }: { children: JSX.Element }): any => {
  const {
    tokenState,
    backTittleArrOpt,
    systemConfigObjectState,
    setMenuListOpen,
    setExtendState,
    logoutStore,
  } = useMiddleware()
  const router = useRouter()
  const { postLogout, getAllUniversalOption } = useAdmin()
  const [mobileMenuListOpen, setMobileMenuListOpen] = useState(false)
  const [mount, setMount] = useState(false)
  // 判斷是否為移動裝置
  const mobileDialog: boolean = useMediaQuery('(max-width:425px)')
  const mobileDrawer: boolean = useMediaQuery('(max-width:600px)')
  // 判斷寬度是否足夠顯示麵包屑
  const show: boolean = useMediaQuery('(min-width:900px)')
  const { titleArray } = useRouterName()
  const { backTitleName: titleName } = useTitleName()
  // 多國語系
  const { currentLang } = useLocales()

  // 登入後右上側點擊顯示popover彈窗
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const handlePopOverClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)
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
    setMenuListOpen(false)
    if (tokenState === '') {
      handleExit()
    }
  })

  useUpdateEffect(() => {
    setMenuListOpen(false)
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
        <MobileCusAppBar position="fixed" open={mobileMenuListOpen}>
          <StyledToolbar variant="dense">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setMobileMenuListOpen(!mobileMenuListOpen)}
              edge="start"
            >
              {mobileMenuListOpen ? (
                <KeyboardDoubleArrowLeftIcon
                  sx={{ fontSize: '2rem', color: THEME_COLOR.SECONDARY_ADMIN }}
                />
              ) : (
                <MenuIcon sx={{ fontSize: '2rem', color: THEME_COLOR.SECONDARY_ADMIN }} />
              )}
            </IconButton>

            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              sx={{
                // display: !show ? 'none' : 'default',
                margin: '0',
                padding: '8px 10px',
                fontWeight: 600,
                cursor: 'default',
              }}
            >
              <Link underline="none" color={THEME_COLOR.HEADER_TEXT}>
                {backTittleArrOpt.map(({ router, name }: { router: string; name: any }) => {
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
                  handleLogout={async () => {
                    logoutStore(router?.pathname)
                    await postLogout()
                    router.push('/Login')
                  }}
                />
              </Box>
            </Box>
          </StyledToolbar>
        </MobileCusAppBar>
        <StyledDrawer
          anchor="left"
          ModalProps={{
            keepMounted: true,
          }}
          open={mobileMenuListOpen}
          onClick={() => setMobileMenuListOpen(!mobileMenuListOpen)}
        >
          <DrawerHeader
            className="noBoxShadow"
            sx={{ backgroundColor: mobileDrawer ? THEME_COLOR.HEADER_BG_ADMIN : 'default' }}
          >
            <Image
              alt="login logo"
              src={
                systemConfigObjectState.menuLogoLink === ''
                  ? '/images/logo/backImg.png'
                  : systemConfigObjectState.menuLogoLink
              }
              style={{
                width: '11rem',
                height: 'auto',
                objectFit: '-moz-initial',
                paddingTop: '2px',
              }}
            />
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
        <MobileMain open={mobileMenuListOpen} attendance={router?.pathname}>
          <DrawerHeader />
          {children}
        </MobileMain>
      </Box>
    )
  )
}

export default MobileMainLayout
