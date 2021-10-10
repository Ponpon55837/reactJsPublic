import {
  Backdrop,
  CircularProgress,
}from '@mui/material'

const BackDrop = ({ backDropOpen }) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={backDropOpen}
      onClick={() => {}}
    >
      <CircularProgress size='10rem' color="inherit" />
    </Backdrop>
  )
}

export default BackDrop
