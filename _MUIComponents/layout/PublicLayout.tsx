import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import useMiddleware from '@hooks/use-middleware'
import { useTitleName } from '@hooks/useRouterAndTitleName'
import { useLocales } from '@locales/index'
import { Box } from '@mui/material'

const MainLayout = ({ children }: { children: JSX.Element }): any => {
  const [mount, setMount] = useState(false)
  const router = useRouter()
  const { currentLang } = useLocales()
  const { systemConfigObjectState } = useMiddleware()
  const { backTitleName: titleName } = useTitleName()

  useEffectOnce(() => {
    setMount(true)
  })

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
        {children}
      </Box>
    )
  )
}

export default MainLayout
