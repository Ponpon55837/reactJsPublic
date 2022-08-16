import { Button } from '@mui/material'
import { ListDivCenter } from '@styles/generalStyle'

interface Props {
  isEnabled: boolean
  success?: string
  failed?: string
}

const EnabledStatus = ({ isEnabled, success = '啟用中', failed = '已停用' }: Props) => {
  return (
    <ListDivCenter>
      <Button
        disabled={!isEnabled}
        color="success"
        sx={{ m: 0, p: 0, lineHeight: '1.5', fontSize: '0.95rem', verticalAlign: 'initial' }}
      >
        {isEnabled ? success : failed}
      </Button>
    </ListDivCenter>
  )
}

export default EnabledStatus
