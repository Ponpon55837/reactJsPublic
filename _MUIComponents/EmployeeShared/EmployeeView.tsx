import { useForm } from 'react-hook-form'
import { useEffectOnce } from 'react-use'
import useGeneralApi from 'src/service/GeneralAPIService'
import { useImmer } from 'use-immer'
import { AdminBackDrop as BackDrop } from '@components/BackDrop'
import { AdminSelectAutoComplete as SelectAutoComplete } from '@components/SelectAutoComplete'
import { ViewProps } from '@interface/pageProps'
import { useLocales } from '@locales/index'
import { ALL_USER_OPTIONS } from '@service/API_Admin'
import { CustomBox3 } from '@styles/styles_normal/boxStyle'
import { EditSubTitle } from '@styles/styles_normal/generalStyle'
import { HasValueNotEmpty } from '@utils/utilsFunction'

interface FormValues {
  unitId: string | null
  deptId: string | null
  userId: string | null
  maintainerOptions: any[]
  unitOptions: Array<{ id: string; name: string }>
  deptOptions: Array<{ id: string; name: string }>
  userOptions: Array<{ id: string; name: string }>
  subLoading: boolean
}

const EmployeeView = ({ result }: ViewProps) => {
  const { t } = useLocales()
  const [state, produce] = useImmer<FormValues>({
    unitId: null,
    deptId: null,
    userId: null,
    maintainerOptions: [],
    unitOptions: [],
    deptOptions: [],
    userOptions: [],
    subLoading: false,
    ...result,
  })

  const { unitOptions, deptOptions, userOptions, subLoading } = state

  const { getValues, reset, control } = useForm<FormValues>({
    defaultValues: {
      ...state,
    },
  })

  const { getSelectOptionData } = useGeneralApi()

  const getMaintainerOptionList = async () => {
    const getUnitId = getValues('unitId')
    const getDeptId = getValues('deptId')
    const getUserId = getValues('userId')
    const { status, result } = await getSelectOptionData(ALL_USER_OPTIONS)
    if (status === 200 && result.length > 0) {
      produce((draft) => {
        draft.maintainerOptions = result
        draft.unitOptions = result.map((m: { unitId: string | number; unitName: string }) => {
          return { id: m.unitId, name: m.unitName }
        })
        if (HasValueNotEmpty(getUnitId)) {
          getDeptOptions(draft, result)
        }
        if (HasValueNotEmpty(getDeptId)) {
          getUserOptions(draft, result)
        }
      })

      if (result.indexOf((user: { id: string | null }) => (user.id = getUserId)) !== -1) {
        reset({
          ...getValues(),
          userId: null,
        })
      }
    } else if (status === 200 && result.length === 0) {
      reset({
        ...getValues(),
        userId: null,
      })
      produce((draft) => {
        draft.userOptions = result
      })
    }
  }

  const getDeptOptions = (draft: any, result: any) => {
    const getUnitId = getValues('unitId')

    draft.deptOptions = result
      .find((f: { unitId: string | number }) => f.unitId === getUnitId)
      ?.data.map((m: { deptId: string | number; deptName: string }) => {
        return { id: m.deptId, name: m.deptName }
      })
  }

  const getUserOptions = (draft: any, result: any) => {
    const getUnitId = getValues('unitId')
    const getDeptId = getValues('deptId')
    draft.userOptions = result
      .find((f: { unitId: string | number }) => f.unitId === getUnitId)
      ?.data.find((f: { deptId: string }) => f.deptId === getDeptId)
      ?.userData.map((m: { userId: string; userName: string }) => {
        return { id: m.userId, name: m.userName }
      })
  }

  useEffectOnce(() => {
    getMaintainerOptionList()
  })

  return (
    <>
      <form noValidate autoComplete="off" id="submitForm">
        <EditSubTitle variant="subtitle1" fontWeight={500} sx={{ mb: 1 }}>
          {`${t('CLEAN_EMPLOYEE_COMMON.subTitle')}`}
        </EditSubTitle>

        <CustomBox3>
          <SelectAutoComplete
            viewStatus
            label={`${t('COMMON.unit')}`}
            name="unitId"
            control={control}
            selectOptions={unitOptions}
          />
        </CustomBox3>

        <CustomBox3>
          <SelectAutoComplete
            viewStatus
            label={`${t('COMMON.dept')}`}
            name="deptId"
            control={control}
            selectOptions={deptOptions}
          />
        </CustomBox3>

        <CustomBox3>
          <SelectAutoComplete
            viewStatus
            label={`${t('COMMON.userName')}`}
            name="userId"
            control={control}
            selectOptions={userOptions}
          />
        </CustomBox3>
      </form>

      <BackDrop backDropOpen={subLoading} />
    </>
  )
}

export default EmployeeView
