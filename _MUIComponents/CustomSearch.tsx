import { Box, InputBase, Divider } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import CancelSharpIcon from '@mui/icons-material/CancelSharp'
import PropTypes from 'prop-types'
import { KeyboardEvent } from 'react'

interface Props {
  placeholder?: string
  inputValue?: string
  width?: string
  minWidth?: string | number
  inputSub?: () => void
  clear?: () => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const CustomSearch = ({
  placeholder = '請輸入搜尋內容',
  inputValue = '',
  width = 'calc(80% - 200px)',
  minWidth = 300,
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
        maxWidth: 470,
        border: '1px solid #DDDDDD',
        borderRadius: 1,
        height: '2.6rem',
        width: {
          xs: '100%',
          sm: 'calc(100% - 100px)',
          md: 'calc(90% - 100px)',
          lg: 'calc(90% - 200px)',
          xl: 'calc(90% - 300px)',
        },
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

CustomSearch.propTypes = {
  placeholder: PropTypes.string,
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.string,
  inputSub: PropTypes.func,
  clear: PropTypes.func,
  onChange: PropTypes.func,
}
