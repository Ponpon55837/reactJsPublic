import {
  Backdrop,
  CircularProgress,
  Box,
  Typography
}from '@mui/material'

const BackDrop = ({
  backDropOpen
}) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={backDropOpen}
      onClick={() => {}}
    >
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress size='10rem' color="inherit" />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6" component="div" color="inherit">
            Loading...
          </Typography>
        </Box>
      </Box>
    </Backdrop>
  )
}

export default BackDrop
