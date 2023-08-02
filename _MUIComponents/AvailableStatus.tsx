import CustomToolTypography from '@components/CustomToolTypography'
import { useLocales } from '@locales/index'
import { ListDivCenter } from '@styles/styles_normal/generalStyle'
import { COMPONENTS_COMMON_CLEAN_GREEN, COMPONENTS_COMMON_LOW_GREY } from '@theme/colorManager'

interface Props {
  isAvailable: boolean
}

const AvailableStatus = ({ isAvailable }: Props) => {
  const { t } = useLocales()

  return (
    <ListDivCenter
      sx={{ color: isAvailable ? COMPONENTS_COMMON_CLEAN_GREEN : COMPONENTS_COMMON_LOW_GREY }}
    >
      <CustomToolTypography
        title={
          isAvailable
            ? `${t('ASSET_MANAGE_INDEX.isAvailableTrue')}`
            : `${t('ASSET_MANAGE_INDEX.isAvailableFalse')}`
        }
      />
    </ListDivCenter>
  )
}

export default AvailableStatus
