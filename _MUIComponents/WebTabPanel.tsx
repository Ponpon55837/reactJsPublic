import { useRouter } from 'next/router'
import { SyntheticEvent, useState } from 'react'
import React from 'react'
import { useEffectOnce, useUpdateEffect } from 'react-use'
import useMiddleware from '@hooks/use-middleware'
import { TabPanelProps } from '@interface/pageProps'
import { Box, Tab } from '@mui/material'
import Tabs, { tabsClasses } from '@mui/material/Tabs'
import { StyledPagesBox } from '@styles/styles_normal/Web/listStyle'
import {
  COMPONENTS_COMMON_PURE_WHITE,
  WEB_TAB_BORDER,
  WEB_TAB_BORDER_SHADOW,
} from '@theme/colorManager'

type routerQueryTab = {
  mainTab: string
  subTab: string
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  )
}

const a11yProps = (index: number | string) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

interface Props {
  tabArray: any[]
}

const UniversalTabPanel = ({ tabArray }: Props) => {
  const { menuListOpen } = useMiddleware()
  const [tabValue, setTabValue] = useState<any>(0)
  const [tabSize, setTabSize] = useState<number>(window.innerWidth)
  const router = useRouter()
  const { mainTab } = router.query as routerQueryTab

  useEffectOnce(() => {
    if (mainTab !== undefined) {
      setTabValue(parseInt(mainTab, 10))
    }
  })

  useUpdateEffect(() => {
    const handleResize = () => setTabSize(window.innerWidth)
    window.addEventListener('resize', handleResize)
  }, [window.innerWidth, menuListOpen])

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <>
      <Box>
        <StyledPagesBox>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            TabIndicatorProps={{
              style: {
                background: WEB_TAB_BORDER,
                boxShadow: `0px 0px 4px 1px ${WEB_TAB_BORDER_SHADOW}`,
              },
            }}
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: { '&.Mui-disabled': { opacity: 0.3 } },
              backgroundColor: '#ffffff00',
              color: COMPONENTS_COMMON_PURE_WHITE,
            }}
          >
            {tabArray.map(({ id, label }: { id: number | string; label: string }) => (
              <Tab
                sx={{
                  '&.MuiTab-root': { color: COMPONENTS_COMMON_PURE_WHITE, fontWeight: 'normal' },
                }}
                key={id}
                label={label}
                value={id}
                {...a11yProps(id)}
              />
            ))}
          </Tabs>
        </StyledPagesBox>
        {tabArray.map(
          ({ id, insertPage }: { id: number; insertPage: React.ReactElement }, idx: number) => (
            <TabPanel key={idx} value={tabValue} index={id}>
              {insertPage}
            </TabPanel>
          ),
        )}
      </Box>
    </>
  )
}

export default UniversalTabPanel
export { TabPanel, a11yProps }
