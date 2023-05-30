import { SyntheticEvent, useState } from 'react'
import { useUpdateEffect } from 'react-use'
import useMiddleware from '@hooks/use-middleware'
import { TabPanelProps } from '@interface/pageProps'
import { Box, Tab } from '@mui/material'
import Tabs, { tabsClasses } from '@mui/material/Tabs'
import { ChildrenCard } from '@styles/styles_normal/childrenStyle'
import { COMPONENTS_COMMON_CLEAN_PINK_WHITE } from '@theme/colorManager'

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
        <Box sx={{ pt: 2 }}>
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

  useUpdateEffect(() => {
    const handleResize = () => setTabSize(window.innerWidth)
    window.addEventListener('resize', handleResize)
  }, [window.innerWidth, menuListOpen])

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <ChildrenCard>
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
            {tabArray.map(({ id, label }: { id: number | string; label: string }) => (
              <Tab
                key={id}
                label={label}
                value={id}
                {...a11yProps(id)}
                sx={{ fontWeight: 'bold' }}
              />
            ))}
          </Tabs>
        </Box>
        {tabArray.map(
          ({ id, insertPage }: { id: number; insertPage: React.ReactElement }, idx: number) => (
            <TabPanel key={idx} value={tabValue} index={id}>
              {insertPage}
            </TabPanel>
          ),
        )}
      </Box>
    </ChildrenCard>
  )
}

export default UniversalTabPanel
export { TabPanel, a11yProps }
