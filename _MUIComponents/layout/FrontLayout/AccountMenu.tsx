import Link from 'next/link'
import { useRouter } from 'next/router'
import { useGeolocated } from 'react-geolocated'
import useGeneralApi from 'src/service/GeneralAPIService'
import useMiddleWare from '@hooks/use-middleware'
import { useLocales } from '@locales/index'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LockResetIcon from '@mui/icons-material/LockReset'
import Logout from '@mui/icons-material/Logout'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import PunchClockIcon from '@mui/icons-material/PunchClock'
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import ListItemIcon from '@mui/material/ListItemIcon'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { PUNCH_IN, PUNCH_OUT } from '@service/APP_Web'
import { StyledAccountMenu } from '@styles/styles_front_layout/mainLayoutStyle'
import {
  THEME_COLOR,
  WEB_ACCOUNT_MENU_ALERT,
  WEB_ACCOUNT_MENU_COMMON_BTN,
  WEB_ACCOUNT_MENU_LOGOUT_BTN,
  WEB_ACCOUNT_MENU_MAN_ICON,
  WEB_ACCOUNT_MENU_PUNCH_BG,
  WEB_ACCOUNT_MENU_PUNCH_BTN,
  WEB_ACCOUNT_MENU_PUNCH_HOVER_BG,
  WEB_ACCOUNT_MENU_PUNCH_TEXT,
} from '@theme/colorManager'
import { FormatHM } from '@utils/utilsFunction'

interface AccountMenuProps {
  anchorEl: HTMLElement | null
  open: boolean
  id?: string
  handleClose: () => void
  handleLogout: () => void
  handlePunch: () => void
  punch?: any
}

const AccountMenu = ({
  anchorEl,
  open,
  id,
  handleClose,
  handleLogout,
  handlePunch,
  punch,
}: AccountMenuProps) => {
  const { userNameState, userMailState, userPicState, systemConfigObjectState } = useMiddleWare()
  const router = useRouter()
  const { t } = useLocales()
  const { updateAllThisData } = useGeneralApi()

  // GPS
  const { coords, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })

  const data = {
    coordinate: `${coords?.latitude}, ${coords?.longitude}`,
  }

  // 上班打卡
  const PunchIn = async () => {
    const { status } = await updateAllThisData(PUNCH_IN, data)
    if (status === 204) {
      handlePunch()
    }
  }
  // 下班打卡
  const PunchOut = async () => {
    const { status } = await updateAllThisData(PUNCH_OUT, data)
    if (status === 204) {
      handlePunch()
    }
  }

  return (
    <>
      <StyledAccountMenu
        anchorEl={anchorEl}
        id={id}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: '15rem',
            overflow: 'visible',
            filter: `drop-shadow(1px 2px 3px ${THEME_COLOR.SHADOW_DARK})`,
            borderColor: '#797979',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 19,
              width: 10,
              height: 10,
              backgroundColor: THEME_COLOR.ACCOUNT_MENU.BG,
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Stack sx={{ textAlign: 'center', my: 3 }}>
          {userPicState !== '' && userPicState !== null && userPicState !== undefined ? (
            <Avatar
              alt="uses's picture"
              src={userPicState}
              sx={{
                color: WEB_ACCOUNT_MENU_MAN_ICON,
                width: '70px !important',
                height: '70px !important',
                display: 'block !important',
                mx: 'auto !important',
              }}
            />
          ) : (
            <AccountCircleIcon
              sx={{
                color: WEB_ACCOUNT_MENU_MAN_ICON,
                width: '70px',
                height: '70px',
                display: 'block',
                mx: 'auto',
              }}
            />
          )}
          <Typography sx={{ fontSize: '1.1rem' }} color="text.secondary">
            {userNameState}
          </Typography>
          <Typography sx={{ fontSize: '12px' }} color="text.secondary">
            {userMailState}
          </Typography>
        </Stack>
        <Divider />

        {/* {(partner === 'Cleaner' || partner === 'Guard') && ( */}
        <div style={{ display: 'flex' }}>
          <Stack sx={{ m: ' 0.6rem auto' }}>
            <Button
              disabled={!isGeolocationEnabled || punch?.punchIn}
              sx={{
                '&:hover': { background: WEB_ACCOUNT_MENU_PUNCH_HOVER_BG },
                padding: '4px 0px 5px',
                width: '108px',
                height: '38px',
                borderRadius: '7px',
                fontSize: '14px',
                color: WEB_ACCOUNT_MENU_PUNCH_BTN,
                background: WEB_ACCOUNT_MENU_PUNCH_BG,
              }}
              onClick={() => PunchIn()}
            >
              {`${t('ACCOUNT_MENU.punchIn')}`}
              <PunchClockIcon sx={{ fontSize: '1.2rem', margin: '2px 0 3px 5px' }} />
            </Button>
          </Stack>

          <Stack sx={{ m: '0.6rem auto' }}>
            <Button
              disabled={!isGeolocationEnabled || !punch?.punchIn}
              sx={{
                '&:hover': { background: WEB_ACCOUNT_MENU_PUNCH_HOVER_BG },
                padding: '4px 0px 5px',
                width: '108px',
                height: '38px',
                borderRadius: '7px',
                fontSize: '14px',
                color: WEB_ACCOUNT_MENU_PUNCH_BTN,
                background: WEB_ACCOUNT_MENU_PUNCH_BG,
              }}
              onClick={() => PunchOut()}
            >
              {`${t('ACCOUNT_MENU.punchOut')}`}
              <PunchClockIcon sx={{ fontSize: '1.2rem', margin: '2px 0 3px 5px' }} />
            </Button>
          </Stack>
        </div>

        <Grid container sx={{ mb: '8px' }}>
          <Grid item xs={6} sx={{ textAlign: 'center' }}>
            {punch?.punchIn && (
              <Typography
                style={{ fontSize: '12px', color: WEB_ACCOUNT_MENU_PUNCH_TEXT, fontWeight: 700 }}
              >
                {FormatHM(punch?.punchIn)} {`${t('ACCOUNT_MENU.punchInText')}`}
              </Typography>
            )}
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'center' }}>
            {punch?.punchOut && (
              <Typography
                style={{ fontSize: '12px', color: WEB_ACCOUNT_MENU_PUNCH_TEXT, fontWeight: 700 }}
              >
                {FormatHM(punch?.punchOut)} {`${t('ACCOUNT_MENU.punchOutText')}`}
              </Typography>
            )}
          </Grid>
        </Grid>
        {/* )} */}

        {/* {(partner === 'Guard' || partner === 'Cleaner') && !isGeolocationEnabled && ( */}
        {!isGeolocationEnabled && (
          <Box
            style={{
              fontWeight: 700,
              textAlign: 'center',
              fontSize: '0.875rem',
              color: WEB_ACCOUNT_MENU_ALERT,
              margin: '0 auto 8px auto',
              maxWidth: '15rem',
            }}
          >
            {`${t('ACCOUNT_MENU.punchAlert')}`}
          </Box>
        )}

        <Divider />

        <Link
          href={systemConfigObjectState.adminHomePage}
          style={{ textDecoration: 'none' }}
          passHref
        >
          <MenuItem
            sx={{
              color: WEB_ACCOUNT_MENU_COMMON_BTN,
              fontSize: '1rem',
              fontWeight: 700,
              width: '100%',
              height: '50px',
              textAlign: 'center',
              my: 'auto',
              borderBottom: '1px solid #DDDDDD',
            }}
          >
            <ListItemIcon>
              <ViewQuiltIcon fontSize="medium" sx={{ color: WEB_ACCOUNT_MENU_COMMON_BTN }} />
            </ListItemIcon>
            {`${t('ACCOUNT_MENU.backStage')}`}
          </MenuItem>
        </Link>

        <MenuItem
          sx={{
            color: WEB_ACCOUNT_MENU_COMMON_BTN,
            fontSize: '1rem',
            fontWeight: 700,
            width: '100%',
            height: '50px',
            textAlign: 'center',
            my: 'auto',
            borderBottom: '1px solid #DDDDDD',
          }}
          onClick={() => {
            router.push('/web/PersonalSetting')
            handleClose()
          }}
        >
          <ListItemIcon>
            <ManageAccountsIcon fontSize="medium" sx={{ color: WEB_ACCOUNT_MENU_COMMON_BTN }} />
          </ListItemIcon>
          {`${t('ACCOUNT_MENU.personalSetting')}`}
        </MenuItem>

        <MenuItem
          sx={{
            color: WEB_ACCOUNT_MENU_COMMON_BTN,
            fontSize: '1rem',
            fontWeight: 700,
            width: '100%',
            height: '50px',
            textAlign: 'center',
            my: 'auto',
            borderBottom: '1px solid #DDDDDD',
          }}
          onClick={() => {
            router.push('/web/ChangePassword')
            handleClose()
          }}
        >
          <ListItemIcon>
            <LockResetIcon fontSize="medium" sx={{ color: WEB_ACCOUNT_MENU_COMMON_BTN }} />
          </ListItemIcon>
          {`${t('ACCOUNT_MENU.changePassword')}`}
        </MenuItem>
        <MenuItem
          sx={{
            color: WEB_ACCOUNT_MENU_LOGOUT_BTN,
            fontWeight: 700,
            fontSize: '1rem',
            width: '100%',
            textAlign: 'center',
            my: 'auto',
            height: '42px',
          }}
          onClick={handleLogout}
        >
          <ListItemIcon>
            <Logout fontSize="medium" sx={{ color: WEB_ACCOUNT_MENU_LOGOUT_BTN, my: 'auto' }} />
          </ListItemIcon>
          {`${t('ACCOUNT_MENU.logout')}`}
        </MenuItem>
      </StyledAccountMenu>
    </>
  )
}

export default AccountMenu
