import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffectOnce } from 'react-use'
import useAdmin from 'src/service/AdminService'
import { useImmer } from 'use-immer'
import { AdminBackDrop as BackDrop } from '@components/BackDrop'
import useMiddleWare from '@hooks/use-middleware'
import { useLocales } from '@locales/index'
import { List, ListItemButton, ListItemText } from '@mui/material'
import { StyledListItemAvatar } from '@styles/styles_front_layout/mainLayoutStyle'
import { THEME_COLOR } from '@theme/colorManager'
import { generateHref } from '@utils/utilsFunction'

const SideMenuRoute = () => {
  const { getFrontMenuList } = useAdmin()
  const { tokenState, frontLeftSideMenuValue } = useMiddleWare()
  // 多國語系
  const { currentLang } = useLocales()
  const [state, produce] = useImmer({
    subLoading: false,
  })

  const { subLoading } = state
  const getFrontMenuLists = async () => await getFrontMenuList()

  const router = useRouter()
  const pathName = router.pathname
  const sxObject = (checkValue: boolean) => {
    switch (checkValue) {
      // 左側選單選擇該項目
      case true:
        return {
          fontSize: '0.938rem',
          height: '2.5rem',
          color: THEME_COLOR.SIDE_MENU.ACTIVE_TEXT,
          background: THEME_COLOR.SIDE_MENU.ACTIVE_BG,
          opacity: 'default',
          '&:hover': {
            color: THEME_COLOR.SIDE_MENU.HOVER_TEXT,
            background: THEME_COLOR.SIDE_MENU.HOVER_BG,
            opacity: 'default',
          },
        }
      // 左側選單未選項目
      case false:
        return {
          fontSize: '0.938rem',
          height: '2.5rem',
          color: THEME_COLOR.SIDE_MENU.ACTIVE_TEXT,
          background: 'default',
          opacity: 0.8,
          '&:hover': {
            color: THEME_COLOR.SIDE_MENU.HOVER_TEXT,
            background: THEME_COLOR.SIDE_MENU.HOVER_BG,
            opacity: 1,
          },
        }
    }
  }

  useEffectOnce(() => {
    produce((draft) => {
      draft.subLoading = true
    })
    if (tokenState) getFrontMenuLists()
    produce((draft) => {
      draft.subLoading = false
    })
  })

  return (
    <List
      sx={{
        p: '2px 0',
        overflowY: 'overlay',
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&:hover::-webkit-scrollbar-thumb': {
          borderRadius: '6px',
          backgroundColor: THEME_COLOR.SCROLLBAR.THUMB,
        },
      }}
    >
      {frontLeftSideMenuValue.map((route: { name: any; list: any }, idx: number) => (
        <div key={idx}>
          <ListItemText
            sx={{
              height: '2.5rem',
              // 左側選單大分類
              background: THEME_COLOR.SIDE_MENU.GROUP_BG_WEB,
              color: THEME_COLOR.SIDE_MENU.GROUP_TEXT_WEB,
              borderRadius: '1rem',
              py: 1,
              m: 1,
              textAlign: 'center',
              cursor: 'default',
            }}
            primary={route.name[`${currentLang.value}`]}
            primaryTypographyProps={{
              fontSize: '0.938rem',
              fontWeight: 'bold',
            }}
          />
          {route.list.map(
            (
              list: { router: string; iconName: string; name: any; openMethod: string },
              index: number,
            ) => {
              const checkPath = pathName === `/${list.router}` || pathName === `/web/${list.router}`

              return (
                <Link
                  key={index}
                  href={generateHref(list)}
                  style={{ textDecoration: 'none' }}
                  passHref
                  target={list.openMethod == 'Href' ? '_blank' : undefined}
                >
                  <ListItemButton sx={sxObject(checkPath)}>
                    <StyledListItemAvatar className="material-icons">
                      {list.iconName}
                    </StyledListItemAvatar>
                    {list.name[`${currentLang.value}`]}
                  </ListItemButton>
                </Link>
              )
            },
          )}
        </div>
      ))}
      <BackDrop backDropOpen={subLoading} />
    </List>
  )
}

export default SideMenuRoute
