import useMiddleware from '@hooks/use-middleware'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Avatar } from '@mui/material'
import { ADMIN_ACCOUNT_MENU_MAN_ICON } from '@theme/colorManager'

const AvatarDisplay = () => {
  const { userPicState } = useMiddleware()

  return (
    <>
      {userPicState !== '' && userPicState !== null && userPicState !== undefined ? (
        <Avatar
          alt="uses's picture"
          src={userPicState}
          sx={{
            color: ADMIN_ACCOUNT_MENU_MAN_ICON,
            width: 30,
            height: 30,
          }}
        />
      ) : (
        <AccountCircleIcon
          sx={{
            color: ADMIN_ACCOUNT_MENU_MAN_ICON,
            width: '40px',
            height: '40px',
            display: 'block',
            mx: 'auto',
          }}
        />
      )}
    </>
  )
}

export default AvatarDisplay
