import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import { signArray, colorArray, approvalArray } from '@utils/statusArray'

interface Props {
  status: number
  closeDay: boolean
  phase: number
}

const StatusTypography = ({ status, closeDay, phase }: Props) => {
  return (
    <Typography
      noWrap
      fontWeight={400}
      sx={{ color: closeDay ? 'default' : colorArray[status], fontSize: '.9rem' }}
    >
      {!closeDay
        ? `${phase !== 0 ? `第${approvalArray[phase]}階段` : ''} ${signArray[status]}`
        : '已關帳'}
    </Typography>
  )
}

export default StatusTypography

StatusTypography.propTypes = {
  status: PropTypes.number,
  closeDay: PropTypes.bool,
  phase: PropTypes.number,
}
