import { ListDivCenter } from '@styles/generalStyle'
import CustomToolTypography from '@components/CustomToolTypography'
interface Props {
  isEnabled: boolean
  success?: string
  failed?: string
}

const EnabledStatus = ({ isEnabled, success = '啟用中', failed = '已停用' }: Props) => {
  return (
    <ListDivCenter sx={{ color: isEnabled ? '#2e7d32' : '#797979' }}>
      <CustomToolTypography title={isEnabled ? success : failed} />
    </ListDivCenter>
  )
}

export default EnabledStatus
