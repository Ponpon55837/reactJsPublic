import useAdmin from 'src/service/AdminService'
import ClickAwayBtn from '@components/ClickAwayBtn'
import CustomToolTypography from '@components/CustomToolTypography'
import useMiddleWare from '@hooks/use-middleware'
import { useLocales } from '@locales/index'
import { ListDivCenter } from '@styles/styles_normal/generalStyle'
import { EmailValidColor } from '@utils/utilsFunction'

interface ViewValues {
  inputId: number
  inputConfirmationStatus: number
  isEnabled: boolean
  backDropOpenFunc: () => void
  backDropCloseFunc: () => void
}

const EmailValidListView = ({
  inputId,
  inputConfirmationStatus,
  isEnabled,
  backDropOpenFunc,
  backDropCloseFunc,
}: ViewValues) => {
  const { t } = useLocales()
  const { confirmationState } = useMiddleWare()
  const { putReSendAccountConfirmation } = useAdmin()

  // 重新發送驗證信
  const handleReSendConfirmation = async (id: number) => {
    backDropOpenFunc()
    await putReSendAccountConfirmation(id)
    backDropCloseFunc()
  }

  // 信箱驗證狀態
  const handleEmailValidStatus = (id: number, confirmationStatus: number, isEnabled: boolean) => {
    if (confirmationStatus === 1) {
      return (
        <ListDivCenter>
          <ClickAwayBtn
            disabled={!isEnabled}
            executeColor="error"
            executeLabel={
              confirmationState.find((fil: { id: number }) => fil.id === confirmationStatus)
                ?.name ?? '-'
            }
            executeDescription={`${t('COMMON.reSendEmailValid')}`}
            variant="outlined"
            successColor="success"
            successLabel={`${t('CLICK_AWAY_BUTTON.successLabel')}`}
            successClick={() => handleReSendConfirmation(id)}
          />
        </ListDivCenter>
      )
    } else {
      return (
        <ListDivCenter sx={{ color: EmailValidColor(confirmationStatus) }}>
          <CustomToolTypography
            toolTipTrigger
            title={
              confirmationState.find((fil: { id: number }) => fil.id === confirmationStatus)
                ?.name ?? '-'
            }
          />
        </ListDivCenter>
      )
    }
  }

  return <>{handleEmailValidStatus(inputId, inputConfirmationStatus, isEnabled)}</>
}
export default EmailValidListView
