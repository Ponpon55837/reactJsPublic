import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
} from 'react-hook-form'
import useAdmin from 'src/service/AdminService'
import { useImmer } from 'use-immer'
import { AdminBackDrop as BackDrop } from '@components/BackDrop'
import MultiImage from '@components/MultiImg'
import { FlowProps } from '@components/NestPatrolFlow/FlowFiledInterface'
import TicketsTextField from '@components/NestTicketFlow/TicketsTextField'
import { StylesTaskAddButton, StylesTaskDeleteButton } from '@components/NestTicketFlow/styles'
import { useLocales } from '@locales/index'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'
import DeleteIcon from '@mui/icons-material/Delete'
import { CustomBox2, CustomBox3 } from '@styles/styles_normal/boxStyle'
import { EditSubTitle } from '@styles/styles_normal/generalStyle'
import { ADMIN_TABLE_BG_WHITE, WEB_BORDER_DARK, WEB_COMMON_WHITE_GREY } from '@theme/colorManager'
import { HandleFormError } from '@utils/utilsFunction'

const backSx = {
  background: ADMIN_TABLE_BG_WHITE,
  border: `1px solid #DDDDDD`,
}

const frontSx = {
  background: 'none',
  border: `2px solid ${WEB_BORDER_DARK}`,
  color: WEB_COMMON_WHITE_GREY,
}

interface TaskProps {
  subLoading: boolean
}

const TaskStructure = ({
  nestIndex,
  viewStatus = false,
  control,
  register,
  watch,
  setValue,
  errors,
  uploadAPI = 'CleanTicket',
  colorStyle = 'back',
}: {
  nestIndex: number
  viewStatus: boolean
  control: Control<FlowProps>
  register: UseFormRegister<FlowProps>
  setValue: UseFormSetValue<FlowProps>
  watch: UseFormWatch<FlowProps>
  errors: any
  uploadAPI: string
  colorStyle: 'back' | 'front'
}) => {
  const { t } = useLocales()
  const { postFileArrayUpload } = useAdmin()
  const { fields, insert, remove } = useFieldArray({
    control,
    name: `routeFlowStepData.${nestIndex}.routeFlowTaskData` as const,
  })

  const [state, produce] = useImmer<TaskProps>({
    subLoading: false,
  })
  const { subLoading } = state

  const viewLabelText = (label: string) => {
    return viewStatus ? `${label}` : `* ${label}`
  }

  const returnSx = () => {
    switch (colorStyle) {
      case 'front':
        return frontSx
      case 'back':
        return backSx
      default:
        return backSx
    }
  }

  return (
    <div
      style={{
        borderRadius: '10px',
      }}
    >
      {fields.map((field, taskIndex) => {
        // 設定一個變數名稱來取取代 `routeFlowTaskData.${nestIndex}.routeFlowStepData.${taskIndex}`
        const propertyPath =
          `routeFlowStepData.${nestIndex}.routeFlowTaskData.${taskIndex}` as const
        // 編輯時後端給的圖片資料
        const getInitialImgArray = watch(`${propertyPath}.fileObjects`) ?? []
        // 新增或編輯時上傳完圖片後，後端回返的字串組成陣列
        const getArrayValue = watch(`${propertyPath}.pictureArray`) ?? []
        // 新增或編輯時，本地端組成的圖片陣列
        const getStoreImgArrValue = watch(`${propertyPath}.storeImgArr`) ?? []

        const onImageChange = (event: any) => {
          if (!(event.target.files && event.target.files[0])) return
          let file = event.target.files[0]
          let reader = new FileReader()

          reader.readAsDataURL(file)
          reader.onload = async () => {
            produce((draft) => {
              draft.subLoading = true
            })
            const { status, result } = await postFileArrayUpload(uploadAPI, [file])
            if (status === 200) {
              getArrayValue?.splice(0, 0, result)
              getStoreImgArrValue?.splice(0, 0, {
                name: file.name,
                file: file,
                image: reader.result,
              })
              setValue(`${propertyPath}.pictureArray`, getArrayValue)
              setValue(`${propertyPath}.storeImgArr`, getStoreImgArrValue)
            }
            produce((draft) => {
              draft.subLoading = false
            })
          }
        }

        // 新增或編輯本地端圖片與上傳後回返圖片字串陣列刪除
        const handleLocalImageDelete = (idx: any) => {
          const newSpliceImgArr = getArrayValue
          const newSpliceStoreArr = getStoreImgArrValue
          newSpliceImgArr?.splice(idx, 1)
          newSpliceStoreArr?.splice(idx, 1)
          setValue(`${propertyPath}.pictureArray`, newSpliceImgArr)
          setValue(`${propertyPath}.storeImgArr`, newSpliceStoreArr)
        }

        // 編輯時，刪除已有的圖片陣列
        const handleInitialImageDelete = (idx: any) => {
          const newSpliceInitialImgArr = getInitialImgArray
          newSpliceInitialImgArr?.splice(idx, 1)
          setValue(`${propertyPath}.fileObjects`, newSpliceInitialImgArr)
        }

        return (
          <div
            key={field.id}
            style={{
              borderRadius: '10px',
              padding: '0.5rem 1rem',
              marginBottom: '8px',
              position: 'relative',
              ...returnSx(),
            }}
          >
            <EditSubTitle variant="subtitle1" fontWeight={500} sx={{ mb: 1 }}>
              {`${t('COMMON.task')} ${nestIndex + 1}.${taskIndex + 1}`}
            </EditSubTitle>
            <CustomBox3 sx={{ position: 'absolute', top: '0.5rem', right: 0 }}>
              {fields?.length > 1 && !viewStatus && (
                <StylesTaskDeleteButton
                  variant="outlined"
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon fontSize="small" />}
                  onClick={() => remove(taskIndex)}
                >
                  Delete
                </StylesTaskDeleteButton>
              )}
            </CustomBox3>

            <CustomBox2>
              <TicketsTextField
                label={viewLabelText(`${t('COMMON.taskTitle')} ${taskIndex + 1}`)}
                placeholder={viewStatus ? '' : `${t('COMMON.taskTitlePlaceholder')}`}
                readOnly={viewStatus}
                iconStatus
                colorStyle={colorStyle}
                register={{
                  ...register(`${propertyPath}.name` as const, {
                    required: `${t('COMMON.taskTitlePlaceholder')}`,
                    maxLength: {
                      value: 100,
                      message: `${t('COMMON.maxLengthMessage', { count: 100 })}`,
                    },
                  }),
                }}
                error={HandleFormError(
                  errors?.routeFlowStepData?.[nestIndex]?.routeFlowTaskData?.[taskIndex]?.name
                    ?.type,
                )}
                helperText={
                  errors?.routeFlowStepData?.[nestIndex]?.routeFlowTaskData?.[taskIndex]?.name
                    ?.type &&
                  errors?.routeFlowStepData?.[nestIndex]?.routeFlowTaskData?.[taskIndex]?.name
                    ?.message
                }
              />
            </CustomBox2>

            <MultiImage
              localStoreImgArr={getStoreImgArrValue}
              initialImgArr={getInitialImgArray}
              {...{
                onImageChange,
                handleLocalImageDelete,
                handleInitialImageDelete,
                viewStatus,
              }}
            />
            {!viewStatus && (
              <StylesTaskAddButton
                variant="outlined"
                size="small"
                color="info"
                startIcon={<AddCircleSharpIcon />}
                onClick={() =>
                  insert(taskIndex + 1, {
                    name: '',
                    fileObjects: [],
                    pictureArray: [],
                    storeImgArr: [],
                  })
                }
              >
                Add Task
              </StylesTaskAddButton>
            )}
          </div>
        )
      })}
      <BackDrop backDropOpen={subLoading} />
    </div>
  )
}

export default TaskStructure
