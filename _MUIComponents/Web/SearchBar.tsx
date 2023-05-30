import { Box, Breadcrumbs, Toolbar, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { WEB_COMMON_GREY_WHITE } from '@theme/colorManager'

const SearchBarBox = styled(Box)(() => ({
  zIndex: '1200',
  position: 'fixed',
  top: '48px',
  width: '100%',
  height: '50px',
  background: 'none',
  borderBottom: '1px solid transparent',
  borderImage: `linear-gradient(
      90deg,
      #d1e8fd00 0%,
      #d1e8fd5c 28.96%,
      #d1e8fd66 49.79%,
      #d1e8fd5c 71.15%,
      #d1e8fd00 100%)`,
  borderImageSlice: '1',
}))

interface InputStatus {
  nav?: any
  contentComponent?: any
}

const SearchBar = ({ nav, contentComponent }: InputStatus) => {
  return (
    <SearchBarBox>
      <Toolbar variant="dense" style={{ paddingLeft: '1rem' }}>
        <Breadcrumbs
          sx={{ fontSize: '1rem', color: WEB_COMMON_GREY_WHITE }}
          aria-label="breadcrumb"
        >
          {nav?.map((name: any, idx: number) => (
            <Typography style={{ fontSize: '1rem', color: WEB_COMMON_GREY_WHITE }} key={idx}>
              {name}
            </Typography>
          ))}
        </Breadcrumbs>
        <Box sx={{ maxWidth: '60%', ml: '1rem' }}>{contentComponent}</Box>
      </Toolbar>
    </SearchBarBox>
  )
}

export default SearchBar
