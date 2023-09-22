import { Link, Typography } from '@mui/material'
import packageJson from '@packageJson'

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {`v${packageJson.version} © DGiots ${new Date().getFullYear()}`}
    </Typography>
  )
}

export default Copyright
