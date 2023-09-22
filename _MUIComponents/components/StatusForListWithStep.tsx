import CustomToolTypography from '@components/CustomToolTypography'
import { useLocales } from '@locales/index'
import { ListDivCenter } from '@styles/styles_normal/generalStyle'
import { COMPONENTS_COMMON_CLEAN_RED, COMPONENTS_COMMON_LOW_GREY } from '@theme/colorManager'
import {
  DefaultApprovalArr,
  HandleArchivePhaseSwitch,
  HandleSgnNumberSwitch,
  HandleSignColor,
} from '@utils/utilsFunction'

const StatusForListWithStep = ({
  isCanceled,
  isArchivePhase,
  isCloseDate,
  status,
  phase,
}: {
  isCanceled: boolean
  isArchivePhase: boolean
  isCloseDate: boolean
  status: number
  phase: number
}) => {
  const { t } = useLocales()
  const colorFunc = (isCloseDate: boolean, isCanceled: boolean, status: number) => {
    if (isCloseDate) return COMPONENTS_COMMON_LOW_GREY

    if (isCanceled) return COMPONENTS_COMMON_CLEAN_RED

    return HandleSignColor(status)
  }

  const checkFunc = (
    isCloseDate: boolean,
    isCanceled: boolean,
    isArchivePhase: boolean,
    phase: number,
    status: number,
  ) => {
    if (isCanceled && isCloseDate) {
      return `${t('PUNCH_STATUS_COMMON.cancel')} (${t('PUNCH_STATUS_COMMON.close')})`
    } else if (isCanceled) {
      return `${t('PUNCH_STATUS_COMMON.cancel')}`
    }

    if (!isArchivePhase && isCloseDate) {
      return `${t('PUNCH_STATUS_COMMON.step', {
        phase: DefaultApprovalArr[phase],
        status: `${t(`PUNCH_STATUS_COMMON.${HandleSgnNumberSwitch(status)}`)}`,
      })} (${t('PUNCH_STATUS_COMMON.close')})`
    } else if (!isArchivePhase) {
      return `${t('PUNCH_STATUS_COMMON.step', {
        phase: DefaultApprovalArr[phase],
        status: `${t(`PUNCH_STATUS_COMMON.${HandleSgnNumberSwitch(status)}`)}`,
      })}`
    }

    if (isCloseDate) {
      return `${t(`PUNCH_STATUS_COMMON.${HandleArchivePhaseSwitch(status)}`)} (${t(
        'PUNCH_STATUS_COMMON.close',
      )})`
    } else {
      return `${t(`PUNCH_STATUS_COMMON.${HandleArchivePhaseSwitch(status)}`)}`
    }
  }

  return (
    <ListDivCenter sx={{ color: colorFunc(isCloseDate, isCanceled, status) }}>
      <CustomToolTypography
        title={checkFunc(isCloseDate, isCanceled, isArchivePhase, phase, status)}
      />
    </ListDivCenter>
  )
}

export default StatusForListWithStep
