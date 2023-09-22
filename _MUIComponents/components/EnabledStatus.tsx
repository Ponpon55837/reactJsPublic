import CustomToolTypography from '@components/CustomToolTypography'
import { useLocales } from '@locales/index'
import { ListDivCenter } from '@styles/styles_normal/generalStyle'
import { COMPONENTS_COMMON_CLEAN_GREEN, COMPONENTS_COMMON_LOW_GREY } from '@theme/colorManager'

interface Props {
  isEnabled: boolean
}

const EnabledStatus = ({ isEnabled }: Props) => {
  const { t } = useLocales()

  return (
    <ListDivCenter
      sx={{ color: isEnabled ? COMPONENTS_COMMON_CLEAN_GREEN : COMPONENTS_COMMON_LOW_GREY }}
    >
      <CustomToolTypography
        title={isEnabled ? `${t('ENABLE_STATUS.success')}` : `${t('ENABLE_STATUS.disabled')}`}
      />
    </ListDivCenter>
  )
}

export default EnabledStatus
