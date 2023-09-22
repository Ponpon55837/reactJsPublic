import { Control, UseFormRegister, UseFormWatch, useFieldArray } from 'react-hook-form'
import { CustomDatePickerView } from '@components/CustomDateTimePickerView'
import MultiImage from '@components/MultiImg'
import { FlowProps } from '@components/NestInspectionFlow/FlowFiledInterface'
import TicketsTextField from '@components/NestTicketFlow/TicketsTextField'
import { useLocales } from '@locales/index'
import { CustomBox2 } from '@styles/styles_normal/boxStyle'
import { EditSubTitle } from '@styles/styles_normal/generalStyle'
import { ADMIN_TABLE_BG_WHITE, WEB_BORDER_DARK, WEB_COMMON_WHITE_GREY } from '@theme/colorManager'

const backSx = {
  background: ADMIN_TABLE_BG_WHITE,
  border: `1px solid #DDDDDD`,
}

const frontSx = {
  background: 'none',
  border: `2px solid ${WEB_BORDER_DARK}`,
  color: WEB_COMMON_WHITE_GREY,
}

const TaskStructure = ({
  nestIndex,
  viewStatus = true,
  control,
  register,
  watch,
  colorStyle = 'back',
}: {
  nestIndex: number
  viewStatus?: boolean
  control: Control<FlowProps>
  register: UseFormRegister<FlowProps>
  watch: UseFormWatch<FlowProps>
  colorStyle: 'back' | 'front'
}) => {
  const { t } = useLocales()
  const { fields } = useFieldArray({
    control,
    name: `data.${nestIndex}.dailyTaskLocationTaskData` as const,
  })

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
        // 設定一個變數名稱來取取代 `data.${nestIndex}.dailyTaskLocationTaskData.${taskIndex}`
        const propertyPath = `data.${nestIndex}.dailyTaskLocationTaskData.${taskIndex}` as const
        // 編輯時後端給的圖片資料
        const getInitialImgArray = watch(`${propertyPath}.fileObjects`) ?? []
        // 新增或編輯時，本地端組成的圖片陣列
        const getStoreImgArrValue = watch(`${propertyPath}.storeImgArr`) ?? []
        const getFinishedAt = watch(`${propertyPath}.finishedAt`) ?? ''

        const onImageChange = (event: any) => {}
        // 新增或編輯本地端圖片與上傳後回返圖片字串陣列刪除
        const handleLocalImageDelete = (idx: any) => {}
        // 編輯時，刪除已有的圖片陣列
        const handleInitialImageDelete = (idx: any) => {}

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

            <CustomBox2>
              <TicketsTextField
                label={`${t('COMMON.taskTitle')} ${taskIndex + 1}`}
                readOnly
                iconStatus
                colorStyle={colorStyle}
                register={{
                  ...register(`${propertyPath}.name` as const, {}),
                }}
              />
            </CustomBox2>

            <CustomBox2>
              <CustomDatePickerView
                label={`${t('TIME.completionTime')} ${taskIndex + 1}`}
                variant="filled"
                sx={{ width: '100%' }}
                time={getFinishedAt}
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
          </div>
        )
      })}
    </div>
  )
}

export default TaskStructure
