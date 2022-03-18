import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import PropTypes from 'prop-types'
import { KeyboardEvent } from 'react'

interface Props {
  placeholder?: string
  inputValue?: string
  width?: string
  inputSub?: () => void
  clear?: () => void
  onChange?: () => void
}
const CustomSearch = ({
  placeholder = '請輸入搜尋內容',
  inputValue = '',
  width = 'calc(80% - 200px)',
  inputSub = () => {},
  clear = () => {},
  onChange = () => {},
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
    <Paper
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        minWidth: 300,
        maxWidth: 470,
        width: width,
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
          <CloseIcon />
        </IconButton>
      )}
      <Divider sx={{ height: 20, m: 0.5 }} orientation="vertical" />
      <IconButton onClick={inputSub} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default CustomSearch

CustomSearch.propTypes = {
  placeholder: PropTypes.string,
  inputValue: PropTypes.string,
  width: PropTypes.string,
  inputSub: PropTypes.func,
  clear: PropTypes.func,
  onChange: PropTypes.func,
}
