import { KeyboardEvent } from 'react'
import CancelSharpIcon from '@mui/icons-material/CancelSharp'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Divider, InputBase } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { COMPONENTS_COMMON_GREY } from '@theme/colorManager'

interface Props {
  placeholder?: string
  inputValue?: string
  width?: string
  minWidth?: string | number | object
  inputSub?: () => void
  clear?: () => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const CustomSearch = ({
  placeholder = '',
  inputValue = '',
  width = 'calc(80% - 200px)',
  minWidth = '18rem',
  inputSub = () => {},
  clear,
  onChange,
}: Props) => {
  let filterTimeout: any

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>): void => {
    clearTimeout(filterTimeout)
    if (e.key === 'Enter') {
      filterTimeout = setTimeout(() => {
        inputSub()
      }, 500)
    }
  }

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        minWidth: minWidth,
        border: `1px solid ${COMPONENTS_COMMON_GREY}`,
        borderRadius: '8px',
        height: '40px',
        maxWidth: '25rem',
        mr: 1,
        mb: 1,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': placeholder }}
        value={inputValue}
        onChange={onChange}
        onKeyPress={handleKeyPress}
      />
      {inputValue.length > 0 && (
        <IconButton aria-label="search" onClick={clear}>
          <CancelSharpIcon />
        </IconButton>
      )}
      <Divider sx={{ height: 20, m: 0.5 }} orientation="vertical" />
      <IconButton onClick={() => inputSub()} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Box>
  )
}

export default CustomSearch
