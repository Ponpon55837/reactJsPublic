import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import CustomFullDialog from '@components/CustomFullDialog'
import useMiddleWare from '@hooks/use-middleware'
import PatQRCodeView from '@layout/BackLayout/PatQRCodeView'
import { useLocales } from '@locales/index'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AppsIcon from '@mui/icons-material/Apps'
import LockResetIcon from '@mui/icons-material/LockReset'
import Logout from '@mui/icons-material/Logout'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { StyledAccountMenu } from '@styles/styles_back_layout/mainLayoutStyle'
import {
  ADMIN_ACCOUNT_MENU_BORDER,
  ADMIN_ACCOUNT_MENU_COMMON_BTN,
  ADMIN_ACCOUNT_MENU_LOGOUT_BTN,
  ADMIN_ACCOUNT_MENU_MAN_ICON,
  ADMIN_COMMON_GREY,
  THEME_COLOR,
} from '@theme/colorManager'

interface AccountMenuProps {
  anchorEl: HTMLElement | null
  open: boolean
  id?: string
  handleClose: () => void
  handleLogout: () => void
}

const AccountMenu = ({ anchorEl, open, id, handleClose, handleLogout }: AccountMenuProps) => {
  const { userNameState, userMailState, userPicState, systemConfigObjectState } = useMiddleWare()
  const router = useRouter()
  const { t } = useLocales()
  const [patDialogOpen, setPatDialogOpen] = useState<boolean>(false)

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
            borderColor: ADMIN_ACCOUNT_MENU_BORDER,
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
                color: ADMIN_ACCOUNT_MENU_MAN_ICON,
                width: '70px !important',
                height: '70px !important',
                display: 'block !important',
                mx: 'auto !important',
              }}
            />
          ) : (
            <AccountCircleIcon
              sx={{
                color: ADMIN_ACCOUNT_MENU_MAN_ICON,
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

        <Link
          href={systemConfigObjectState.webHomePage}
          style={{ textDecoration: 'none' }}
          passHref
        >
          <MenuItem
            sx={{
              color: ADMIN_ACCOUNT_MENU_COMMON_BTN,
              fontSize: '1rem',
              fontWeight: 700,
              width: '100%',
              height: '50px',
              textAlign: 'center',
              my: 'auto',
              borderBottom: `1px solid ${ADMIN_COMMON_GREY}`,
              display: systemConfigObjectState?.isWebDisabled ? 'none' : 'default',
            }}
          >
            <ListItemIcon>
              <AppsIcon fontSize="medium" sx={{ color: ADMIN_ACCOUNT_MENU_COMMON_BTN }} />
            </ListItemIcon>
            {`${t('ACCOUNT_MENU.frontStage')}`}
          </MenuItem>
        </Link>

        <MenuItem
          sx={{
            color: ADMIN_ACCOUNT_MENU_COMMON_BTN,
            fontSize: '1rem',
            fontWeight: 700,
            width: '100%',
            height: '50px',
            textAlign: 'center',
            my: 'auto',
            borderBottom: `1px solid ${ADMIN_COMMON_GREY}`,
          }}
          onClick={() => {
            setPatDialogOpen(true)
            handleClose()
          }}
        >
          <ListItemIcon>
            <QrCode2Icon fontSize="medium" sx={{ color: ADMIN_ACCOUNT_MENU_COMMON_BTN }} />
          </ListItemIcon>
          {`${t('ACCOUNT_MENU.personalAccessToken')}`}
        </MenuItem>

        <MenuItem
          sx={{
            color: ADMIN_ACCOUNT_MENU_COMMON_BTN,
            fontSize: '1rem',
            fontWeight: 700,
            width: '100%',
            height: '50px',
            textAlign: 'center',
            my: 'auto',
            borderBottom: `1px solid ${ADMIN_COMMON_GREY}`,
          }}
          onClick={() => {
            router.push('/admin/PersonalSetting')
            handleClose()
          }}
        >
          <ListItemIcon>
            <ManageAccountsIcon fontSize="medium" sx={{ color: ADMIN_ACCOUNT_MENU_COMMON_BTN }} />
          </ListItemIcon>
          {`${t('ACCOUNT_MENU.personalSetting')}`}
        </MenuItem>

        <MenuItem
          sx={{
            color: ADMIN_ACCOUNT_MENU_COMMON_BTN,
            fontSize: '1rem',
            fontWeight: 700,
            width: '100%',
            height: '50px',
            textAlign: 'center',
            my: 'auto',
            borderBottom: `1px solid ${ADMIN_COMMON_GREY}`,
          }}
          onClick={() => {
            router.push('/admin/ChangePassword')
            handleClose()
          }}
        >
          <ListItemIcon>
            <LockResetIcon fontSize="medium" sx={{ color: ADMIN_ACCOUNT_MENU_COMMON_BTN }} />
          </ListItemIcon>
          {`${t('ACCOUNT_MENU.changePassword')}`}
        </MenuItem>

        <MenuItem
          sx={{
            color: ADMIN_ACCOUNT_MENU_LOGOUT_BTN,
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
            <Logout fontSize="medium" sx={{ color: ADMIN_ACCOUNT_MENU_LOGOUT_BTN, my: 'auto' }} />
          </ListItemIcon>
          {`${t('ACCOUNT_MENU.logout')}`}
        </MenuItem>
      </StyledAccountMenu>

      <CustomFullDialog
        viewDialog
        toolBarTitle={`${t('ACCOUNT_MENU.personalAccessToken')}`}
        open={patDialogOpen}
        closeFunc={() => setPatDialogOpen(false)}
        contentComponent={<PatQRCodeView result={[]} closeFunc={() => setPatDialogOpen(false)} />}
      />
    </>
  )
}

export default AccountMenu
