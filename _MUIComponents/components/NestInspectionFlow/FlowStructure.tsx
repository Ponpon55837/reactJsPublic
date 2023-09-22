import { useFieldArray } from 'react-hook-form'
import { CustomDatePickerView } from '@components/CustomDateTimePickerView'
import CustomTextField from '@components/CustomTextField'
import TaskStructure from '@components/NestInspectionFlow/TaskStructure'
import { StylesNoDataTypography } from '@components/NestTicketFlow/styles'
import { useLocales } from '@locales/index'
import { Divider } from '@mui/material'
import { CustomBox2 } from '@styles/styles_normal/boxStyle'
import { EditSubTitle } from '@styles/styles_normal/generalStyle'
import { WEB_BORDER_DARK } from '@theme/colorManager'

interface FlowStructureProps {
  control: any
  register: any
  getValues: any
  watch: any
  colorStyle: 'front' | 'back'
}

const FlowStructure = ({
  control,
  register,
  getValues,
  watch,
  colorStyle = 'back',
}: FlowStructureProps) => {
  const { t } = useLocales()
  // flow array
  const { fields } = useFieldArray({
    control,
    name: 'data',
  })

  const backSx = {
    background: WEB_BORDER_DARK, // #a4cee833
    border: `1px solid #DDDDDD`,
  }

  const frontSx = {
    background: 'none',
    border: `2px solid ${WEB_BORDER_DARK}`,
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
    <>
      {fields?.length === 0 && (
        <StylesNoDataTypography>{`${t('TABLE.noData')}`}</StylesNoDataTypography>
      )}
      {fields?.map((field, index: number) => {
        const propertyPath = `data.${index}` as const
        const getScannedAt = getValues(propertyPath)?.scannedAt

        return (
          <div
            key={field.id}
            style={{
              borderRadius: '10px',
              padding: '0.5rem 0.5rem 0.1rem 0.5rem',
              marginBottom: '0.5rem',
              position: 'relative',
              ...returnSx(),
            }}
          >
            <EditSubTitle variant="subtitle1" fontWeight={500} sx={{ mb: 1 }}>
              {`${t('COMMON.inspectionFlow')} ${index + 1}`}
            </EditSubTitle>

            <CustomBox2>
              <CustomTextField
                label={`${t('COMMON.locationName')} ${index + 1}`}
                iconStatus
                register={{
                  ...register(`${propertyPath}.locationName`, {}),
                }}
                readOnly
              />
            </CustomBox2>

            <CustomBox2>
              <CustomDatePickerView
                label={`${t('INSPECTION.scanTime')} ${index + 1}`}
                variant="filled"
                sx={{ width: '100%' }}
                time={getScannedAt}
              />
            </CustomBox2>

            <CustomBox2>
              <CustomTextField
                label={`${t('COMMON.remarks')} ${index + 1}`}
                minRows={3}
                multiline
                register={{
                  ...register(`${propertyPath}.notes`, {}),
                }}
                readOnly
              />
            </CustomBox2>

            <TaskStructure
              colorStyle="back"
              nestIndex={index}
              {...{ control, register, getValues, watch }}
            />

            <Divider sx={{ opacity: 0, my: 1 }} />
          </div>
        )
      })}
    </>
  )
}

export default FlowStructure
