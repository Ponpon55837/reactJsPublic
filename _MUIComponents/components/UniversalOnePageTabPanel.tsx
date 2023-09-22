import { SyntheticEvent, useState } from 'react'
import { useUpdateEffect } from 'react-use'
import { TabPanel, a11yProps } from '@components/UniversalTabPanel'
import useMiddleware from '@hooks/use-middleware'
import { useLocales } from '@locales/index'
import SettingsIcon from '@mui/icons-material/Settings'
import { Box, Tab } from '@mui/material'
import Tabs, { tabsClasses } from '@mui/material/Tabs'
import {
  COMPONENTS_COMMON_CLEAN_PINK_WHITE,
  COMPONENTS_COMMON_DEEP_ORANGE,
} from '@theme/colorManager'

const UniversalOnePageTabPanel = ({
  tabValue,
  tabArray,
  handleTabChange,
  produceDialogFunc,
  pluginName = '',
  newPluginActionSet,
}: {
  tabValue: number
  tabArray: any[]
  handleTabChange: (event: SyntheticEvent, newValue: number) => void
  produceDialogFunc: any
  pluginName: any
  newPluginActionSet: string[]
}) => {
  const { menuListOpen } = useMiddleware()
  // 多國語系
  const { currentLang } = useLocales()
  const [tabSize, setTabSize] = useState<number>(window.innerWidth)

  useUpdateEffect(() => {
    const handleResize = () => setTabSize(window.innerWidth)
    window.addEventListener('resize', handleResize)
  }, [window.innerWidth, menuListOpen])

  return (
    <Box
      sx={{
        maxWidth: { xs: menuListOpen ? tabSize - 260 : tabSize - 40 },
        backgroundColor: `${COMPONENTS_COMMON_CLEAN_PINK_WHITE} !important`,
        p: 0,
        m: 0,
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: `${COMPONENTS_COMMON_CLEAN_PINK_WHITE} !important`,
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              '&.Mui-disabled': { opacity: 0.3 },
            },
            backgroundColor: `${COMPONENTS_COMMON_CLEAN_PINK_WHITE} !important`,
          }}
        >
          {tabArray.map(({ id, name }: { id: number; name: any }) => (
            <Tab key={id} label={name} value={id} {...a11yProps(id)} sx={{ fontWeight: 'bold' }} />
          ))}
          {newPluginActionSet?.length > 0 && (
            <Tab
              icon={<SettingsIcon fontSize="small" sx={{ color: COMPONENTS_COMMON_DEEP_ORANGE }} />}
              iconPosition="start"
              key={999}
              label={pluginName[`${currentLang?.value}`]}
              {...a11yProps(999)}
              value={999}
              sx={{ fontWeight: 'bold', color: COMPONENTS_COMMON_DEEP_ORANGE, minHeight: '48px' }}
              onClick={() => produceDialogFunc()}
            />
          )}
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={tabValue} />
    </Box>
  )
}

export default UniversalOnePageTabPanel
